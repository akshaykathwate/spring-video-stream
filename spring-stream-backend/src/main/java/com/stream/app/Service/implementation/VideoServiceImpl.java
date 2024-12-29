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

    @Autowired
    private VideoRepository videoRepository;

    @PostConstruct
    public void init(){
        File file = new File(DIR);

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

//           Save Matadata
           return videoRepository.save(video);

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
}
