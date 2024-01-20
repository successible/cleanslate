-- To keep the # of logs (that the user will never see) from ballooning 
-- Delete all logs that were created three days ago or older

delete from logs where "createdAt" < now() - interval '3 days'