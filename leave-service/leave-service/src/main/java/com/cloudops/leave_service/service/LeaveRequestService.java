package com.cloudops.leave_service.service;

import com.cloudops.leave_service.entity.LeaveRequest;
import com.cloudops.leave_service.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    public Optional<LeaveRequest> getLeaveById(Integer id) {
        return leaveRequestRepository.findById(id);
    }

    public LeaveRequest createLeave(LeaveRequest leaveRequest) {

        leaveRequest.setStatus("PENDING");
        leaveRequest.setCreatedAt(LocalDateTime.now());

        return leaveRequestRepository.save(leaveRequest);
    }

    public LeaveRequest updateLeave(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    public void deleteLeave(Integer id) {
        leaveRequestRepository.deleteById(id);
    }
}