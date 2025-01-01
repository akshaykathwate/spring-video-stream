package com.stream.app.Service.implementation;


import com.stream.app.Service.VideoService;
import com.stream.app.entities.Video;
//import jakarta.persistence.criteria.Path;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.stream.app.repositories.VideoRepository;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Value("${files.video}")
    String DIR;

    @Value("${files.video.hsl}")
    String HSL_DIR;

    @Autowired
    private VideoRepository videoRepository;

    @PostConstruct
    public void init(){
        File file = new File(DIR);

        try{
            Files.createDirectories(Paths.get(HSL_DIR));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if(!file.exists()) {
            file.mkdir();
            System.out.println("Folder Created ...");
        }else{
            System.out.println(("Folder Aldready Created ..."));
        }
    }

    @Override
    public Video save(Video video, MultipartFile file) {

       try{
//           Get Original FileName
           String fileName = file.getOriginalFilename();
           String contentType = file.getContentType();
           InputStream inputStream =file.getInputStream();

//          file path
           String cleanFileName = StringUtils.cleanPath(fileName);
//           Folder Path
           String cleanFolder = StringUtils.cleanPath(DIR);
//           Folder Path With FileName
           Path path = Paths.get(cleanFolder,cleanFileName );

           System.out.println(path);

//          Copy File to The Folder
           Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);

//          Video Metadata
           video.setContentType(contentType);
           video.setFilePath(path.toString());
           // Save Matadata
            Video savedVideo =  videoRepository.save(video);

//            Process Video
           processVideo(savedVideo.getVideoId());

           return savedVideo;

       } catch (IOException e) {
           throw new RuntimeException(e);
       }
    }

    @Override
    public Video get(String videoId) {
        Video video = videoRepository.findById(videoId).orElseThrow(()-> new RuntimeException("Video Not Found"));
        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public List<Video> getAll() {
        return videoRepository.findAll();
    }

    @Override
    public String processVideo(String videoId) {

        Video video = this.get(videoId);
        String filePath = video.getFilePath();
        System.out.println("filepath is"+ filePath);

        //path where to store data:
        Path videoPath = Paths.get(filePath);
        System.out.println("filepath is"+videoPath);

        try {
        // ffmpeg command
            Path outputPath = Paths.get(HSL_DIR, videoId);

            Files.createDirectories(outputPath);
            System.out.println("output path is :"+ outputPath);

            String ffmpegCmd = String.format(
                    "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename \"%s/segment_%%3d.ts\"  \"%s/master.m3u8\" ",
                    videoPath, outputPath, outputPath
            );

            System.out.println(ffmpegCmd);
            //file this command
            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", ffmpegCmd);
            processBuilder.inheritIO();
            Process process = processBuilder.start();
            int exit = process.waitFor();
            if (exit != 0) {
                throw new RuntimeException("video processing failed!!");
            }
            return videoId;
        } catch (IOException ex) {
            throw new RuntimeException("Video processing fail!!");
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}