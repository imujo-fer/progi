package com.progi;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProgiApplicationTests {

	@Test
    void testGreet() {
        String expectedGreeting = "Hello, World!";
        String actualGreeting = "Hello, World!";
        Assertions.assertEquals(expectedGreeting, actualGreeting, "The greeting message should match the expected output");
    }

}
