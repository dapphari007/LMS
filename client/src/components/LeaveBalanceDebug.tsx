import React, { useEffect } from 'react';
import { useMyLeaveBalances } from '../hooks/useLeaveBalances';

const LeaveBalanceDebug: React.FC = () => {
  const { data: leaveBalancesData, isLoading, error } = useMyLeaveBalances({
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (leaveBalancesData) {
      console.log('Leave balances data:', JSON.stringify(leaveBalancesData, null, 2));
      
      // Find sick leave balance
      const sickLeaveBalance = leaveBalancesData.leaveBalances.find(
        balance => balance.leaveType?.name.toLowerCase().includes('sick')
      );
      
      if (sickLeaveBalance) {
        console.log('Sick leave balance:', {
          totalDays: sickLeaveBalance.totalDays,
          usedDays: sickLeaveBalance.usedDays,
          pendingDays: sickLeaveBalance.pendingDays,
          remainingDays: sickLeaveBalance.remainingDays,
          carryForwardDays: sickLeaveBalance.carryForwardDays,
        });
      }
    }
  }, [leaveBalancesData]);

  if (isLoading) return <div>Loading leave balances...</div>;
  if (error) return <div>Error loading leave balances</div>;
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', margin: '20px 0' }}>
      <h3>Leave Balance Debug</h3>
      {leaveBalancesData?.leaveBalances.map(balance => (
        <div key={balance.id} style={{ marginBottom: '10px' }}>
          <strong>{balance.leaveType?.name}:</strong> 
          <ul>
            <li>Total: {balance.totalDays}</li>
            <li>Used: {balance.usedDays}</li>
            <li>Pending: {balance.pendingDays}</li>
            <li>Remaining: {
              balance.remainingDays !== null && balance.remainingDays !== undefined 
                ? Number(balance.remainingDays).toFixed(1) 
                : (Number(balance.totalDays) + Number(balance.carryForwardDays || 0) - Number(balance.usedDays) - Number(balance.pendingDays)).toFixed(1)
            }</li>
            <li>Carry Forward: {balance.carryForwardDays}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LeaveBalanceDebug;