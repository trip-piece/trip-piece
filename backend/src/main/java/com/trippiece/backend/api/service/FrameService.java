package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.response.FrameResponseDto;
import com.trippiece.backend.api.domain.entity.Frame;
import com.trippiece.backend.api.domain.entity.Region;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.FrameRepository;
import com.trippiece.backend.api.domain.repository.RegionRepository;
import com.trippiece.backend.api.domain.repository.ScrapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FrameService {

    private final FrameRepository frameRepository;
    private final RegionRepository regionRepository;
    private final ScrapRepository scrapRepository;

    //프레임 리스트 조회 및 검색(지역필터링)
    public Page<FrameResponseDto> findFrameList(final User user, final List<Long> regionList, Pageable pageable){
        List<Frame> list = new ArrayList<>();
        if(regionList.isEmpty()) list = frameRepository.findAll();
        else {
            for(long i : regionList) {
                Region region = regionRepository.getOne(i);
                list.addAll(frameRepository.findAllByRegionOrderByIdDesc(region));
            }
        }
        List<FrameResponseDto> responseList = new ArrayList<>();
        for(Frame frame : list){
            responseList.add(new FrameResponseDto(frame, scrapRepository.existsByUserAndDiary(user, frame.getDiary())));
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), responseList.size());
        Page<FrameResponseDto> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }
}
