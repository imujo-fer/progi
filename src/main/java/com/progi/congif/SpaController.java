package com.progi.congif;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @Value("${env}")
    private String env;

    @GetMapping(value = "/{path:^(?!api|swagger|oauth2|images|index.js|index.css).*$}/**")
    public String forwardIndex(Model model) {
        model.addAttribute("env", env);

        return "index";
    }

}
