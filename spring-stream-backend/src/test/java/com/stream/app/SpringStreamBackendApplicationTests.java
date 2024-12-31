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
		String output = videoService.processVideo("f29e23c8-b5f8-442c-8d1c-cbb7b8613771");
		System.out.println("HLS Output Directory: " + output);
	}
}
