New-Variable -Name "dockernatip" -Visibility Public -Value ((Get-NetIPAddress | Where-Object { $_.InterfaceAlias -eq "vEthernet (DockerNAT)" -and $_.AddressFamily -eq "IPv4"}).IPAddress)
New-Variable -Name "uri" -Visibility Public -Value (-join("http://",$dockernatip,":8083/connectors"))
Invoke-WebRequest -uri $uri -Method Post -ContentType 'application/json' -Infile filesource.json 
