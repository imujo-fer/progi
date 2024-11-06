package com.progi.congif;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = "/**")
    public String forwardIndex() {
        return "index";
    }

}
