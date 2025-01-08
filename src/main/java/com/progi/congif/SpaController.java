package com.progi.congif;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.progi.GoogleMaps.Env;

@Controller
public class SpaController {

    @GetMapping(value = "/{path:^(?!api|swagger|oauth2|images|index.js|index.css).*$}/**")
    public String forwardIndex(Model model) {
        model.addAttribute("env", Env.getEnv());

        return "index";
    }

}
