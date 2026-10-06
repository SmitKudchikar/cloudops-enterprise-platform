package com.cloudops.leave_service.controller;

import com.cloudops.leave_service.entity.LeaveRequest;
import com.cloudops.leave_service.service.LeaveRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestService.getAllLeaves();
    }

    @GetMapping("/{id}")
    public LeaveRequest getLeaveById(@PathVariable Integer id) {
        return leaveRequestService.getLeaveById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
    }

    @PostMapping
    public LeaveRequest createLeave(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.createLeave(leaveRequest);
    }

    @PutMapping("/{id}")
public LeaveRequest updateLeave(
        @PathVariable Integer id,
        @RequestBody LeaveRequest leaveRequest) {

    LeaveRequest existingLeave = leaveRequestService.getLeaveById(id)
            .orElseThrow(() -> new RuntimeException("Leave request not found"));

    existingLeave.setEmployeeId(leaveRequest.getEmployeeId());
    existingLeave.setLeaveType(leaveRequest.getLeaveType());
    existingLeave.setStartDate(leaveRequest.getStartDate());
    existingLeave.setEndDate(leaveRequest.getEndDate());
    existingLeave.setReason(leaveRequest.getReason());
    existingLeave.setStatus(leaveRequest.getStatus());

    return leaveRequestService.updateLeave(existingLeave);
}

    @DeleteMapping("/{id}")
    public String deleteLeave(@PathVariable Integer id) {
        leaveRequestService.deleteLeave(id);
        return "Leave request deleted successfully";
    }
}