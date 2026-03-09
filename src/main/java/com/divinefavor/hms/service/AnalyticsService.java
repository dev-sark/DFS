package com.divinefavor.hms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.divinefavor.hms.repository.AnalyticsRepository;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    public List<Map<String, Object>> getVisitVolume() {
        return analyticsRepository.getVisitVolumeOverTime().stream().map(obj -> {
            Map<String, Object> map = new HashMap<>();
            map.put("date", obj[0]);
            map.put("count", obj[1]);
            return map;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getDiseaseStats() {
        return analyticsRepository.getDiseasePrevalence().stream().map(obj -> {
            Map<String, Object> map = new HashMap<>();
            map.put("diagnosis", obj[0]);
            map.put("count", obj[1]);
            return map;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getHighFrequencyPatients(Long threshold) {
        return analyticsRepository.getFrequentVisitors(threshold).stream().map(obj -> {
            Map<String, Object> map = new HashMap<>();
            map.put("patientId", obj[0]);
            map.put("fullName", obj[1]);
            map.put("folderNumber", obj[2]);
            map.put("visitCount", obj[3]);
            return map;
        }).collect(Collectors.toList());
    }
}
