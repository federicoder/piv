package it.piv.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("it.piv.demo.repository")
@ComponentScan(basePackages = "it.piv.demo")
@EntityScan("it.piv.demo.domain")
@SpringBootApplication(scanBasePackages = { "it.piv.demo" })
public class PivbeApplication {

    public static void main(String[] args) {
        SpringApplication.run(PivbeApplication.class, args);
    }

}
