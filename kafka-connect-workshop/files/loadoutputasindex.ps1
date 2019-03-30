New-Variable -Name "dockernatip" -Visibility Public -Value ((Get-NetIPAddress | Where-Object { $_.InterfaceAlias -eq "vEthernet (DockerNAT)" -and $_.AddressFamily -eq "IPv4"}).IPAddress)
New-Variable -Name "uri" -Visibility Public -Value (-join("http://",$dockernatip,":9200/connect-test"))
Invoke-WebRequest -uri $uri -Method Put -ContentType 'application/json' -Infile outputasindex.json 
