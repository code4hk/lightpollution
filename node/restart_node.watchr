watch('.*js') { system('echo "redeploy node"; for X in `ps acx | grep -i "node" | awk {\'print $1\'}`; do
echo "kill"$X;  
kill -9  $X;
done; 
node app.js & > node.log | tee node.log
'

) }

