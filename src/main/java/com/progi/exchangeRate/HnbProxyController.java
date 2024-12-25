package com.progi.exchangeRate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/exchange-rates")
public class HnbProxyController {

    private static final String HNB_API_URL = "https://api.hnb.hr/tecajn-eur/v3"; 

    @CrossOrigin(origins = "*") 
    @GetMapping("/{currency}")
    public ResponseEntity<String> getExchangeRates(
            @PathVariable("currency") String currency
    ) {
        RestTemplate restTemplate = new RestTemplate();

        try {
            String response = restTemplate.getForObject(HNB_API_URL + "?valuta=" + currency, String.class);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching data from HNB API: " + e.getMessage());
        }
    }
}

