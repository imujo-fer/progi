package com.progi.congif;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    // Catch-all route handler for frontend routes
    @GetMapping(value = "/{path:[^\\.]*}")  // This regex will match any path without a dot (e.g., /home, /about)
    public String forwardIndex() {
        // Return index.html so that React/Vite can handle routing
        return "forward:/index.html";
    }

}
