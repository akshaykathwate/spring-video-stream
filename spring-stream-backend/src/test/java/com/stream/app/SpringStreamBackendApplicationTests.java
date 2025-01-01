package com.stream.app;

import com.stream.app.Service.VideoService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringStreamBackendApplicationTests {

	@Autowired
	VideoService videoService;

	@Test
	void testProcessVideo() {
		String output = videoService.processVideo("ab38838f-5fe8-49b6-b7d1-5b3e022ca863");
		System.out.println("HLS Output Directory: " + output);
	}
}
