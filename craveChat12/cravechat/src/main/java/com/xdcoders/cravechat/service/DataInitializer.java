package com.xdcoders.cravechat.service;

import com.xdcoders.cravechat.entity.MenuItem;
import com.xdcoders.cravechat.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public void run(String... args) throws Exception {
        if (menuRepository.count() == 0) {
            MenuItem item1 = new MenuItem();
            item1.setName("Samosa (2pcs)");
            item1.setPrice(20.0);
            item1.setAvailable(true);
            item1.setAiTags("snack, spicy, potato, popular");
            item1.setDescription("Classic crispy potato samosas served with chutney.");

            MenuItem item2 = new MenuItem();
            item2.setName("Cheese Maggi");
            item2.setPrice(45.0);
            item2.setAvailable(true);
            item2.setAiTags("noodle, cheesy, quick, hot");
            item2.setDescription("Instant noodles loaded with extra melted cheese.");

            MenuItem item3 = new MenuItem();
            item3.setName("Cold Coffee");
            item3.setPrice(40.0);
            item3.setAvailable(true);
            item3.setAiTags("beverage, cold, caffeine, sweet");
            item3.setDescription("Thick and creamy cold coffee with chocolate syrup.");

            menuRepository.saveAll(Arrays.asList(item1, item2, item3));
            System.out.println(">> Seed Data: Canteen Menu populated successfully!");
        }
    }
}