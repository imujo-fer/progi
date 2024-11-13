package com.progi.congif;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = "/{path:^(?!api|swagger|oauth2|images|index.js|index.css).*$}/**")
    public String forwardIndex() {
        return "index";
    }

}
