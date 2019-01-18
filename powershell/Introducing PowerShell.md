#### Introducing PowerShell
PowerShell is a command-line shell and scripting language. There are two versions of PowerShell: Windows PowerShell and PowerShell Core. Windows PowerShell is installed on Windows 10 and Windows Server. PowerShell Core is built on .NET Core and runs on Windows, Linux, macOS and in Docker containers.

PowerShell uses commands named cmdlets (pronounced command-lets) that have a verb-noun naming convention. For example, the `Get-Command` cmdlet retrieves all of the cmdlets available in your PowerShell session.
#### Downloading PowerShell
Windows PowerShell is installed on Windows 10 and Windows Server. You can download PowerShell Core from: [https://www.github.com/PowerShell/PowerShell](https://www.github.com/PowerShell/PowerShell).

To run PowerShell from using a docker container, use the following command:
```
docker run -it microsoft/powershell
```
#### Using PowerShell cmdlets
The `Get-Command` cmdlet gets all commands that are installed on the computer, including cmdlets, aliases, functions, workflows, filters, scripts, and applications.

The `Update-Help` cmdlet downloads the newest help files for PowerShell and installs them on your computer.

The `Get-Help` cmdlet displays information about Windows PowerShell concepts and commands, including cmdlets, functions, CIM commands, workflows, providers, aliases and scripts. To show the output in a separate window, use the following command.
```powershell
Get-Help -ShowWindow
```
The `Get-Member` cmdlet gets the members, the properties and methods, of objects. For example, the following command shows the methods and properties of the `System.Management.Automation.CmdletInfo` object.
```powershell
Get-Command -Name Get-Command | Get-Member
```
The `Where-Object` cmdlet selects objects from a collection based on their property values. For example, the following command shows all the processes with a handle greater than 1000.
```powershell
Get-Process | Where-Object Handles -gt 1000
```
The `Select-Object` selects objects or object properties. The following command shows the status and name of all of the services.
```powershell
Get-Service | Select-Object -Property Status,Name
```
The `Sort-Object` cmdlet sorts objects by property values. The following command sorts the processes on the handles property in a descending order.
```powershell
Get-Process | Sort-Object -Property Handles -Descending
```
The `ForEach-Object` cmdlet performs an operation against each item in a collection of input objects. For example, the following command shows the even numbers from 2 to 20.
```powershell
1..10 | Foreach-Object {$_ * 2}
```
The `Measure-Object` cmdlet calculates the numeric properties of objects, and the characters, words, and lines in string objects, such as files of text. The following command displays the minimum, maximum, and average sizes of the working sets of the processes on the computer.
```powershell
Get-Process | Measure-Object -Property workingset -Minimum -Maximum -Average
```
#### Using variables
In PowerShell, variables are represented by text strings that begin with a dollar sign ($), such as `$name`, or `$service`. The following command assigns the string `"C:\Windows\System32"` to the variable `$path`.
```powershell
$path = "C:\Windows\System32"
```
Variables are case insensitive. The `Get-Variable` cmdlet gets the variables in the current console.

You can clear the value of a variable with the `Clear-variable` cmdlet.
```powershell
Clear-Variable -Name $path
```
To remove a variable, use the `Remove-variable` cmdlet.
```powershell
Remove-Variable -Name $Path
```
You can get the help about using variables with the following command.
```powershell
Get-Help about_Variables
```
#### Using aliases
Aliases are alternate names for cmdlets and functions in PowerShell. For example, `dir` and `ls` are aliases for the `Get-ChildItem` cmdlet. `cat` and `type` are aliases for the `Get-Content` cmdlet.

The `Get-Alias` cmdlet retrieves a list of the aliases in the current PowerShell session.

You can use the `New-Alias` cmdlet to create a new alias. The following command creates a new alias named `List` for the `Get-ChildItem` cmdlet.
```powershell
New-Alias -Name List -Value Get-ChildItem
```
You can get the help about aliases with the following command.
```powershell
Get-Help about_aliases
```
# Using functions
A function is a list of Windows PowerShell statements that has a name that you assign. When you run a function, you type the function name. The statements in the list run as if you had typed them at the command prompt.

The following function `Add-Int` adds two integers and returns the sum of the integers.
```powershell
function Add-Int {
  param(
    [int]$i1,
    [int]$i2
  )
   $i1+$i2
}
```
You can call the `Add-Int` function with the following command to add 1 and 2.
```powershell
Add-Int -I1 1 -I2 2
```
Because the `Add-Int` function parameters have a fixed position, you can also call the function without the parameter names using the following command.
```powershell
Add-Int 1 2
```
You can get the help about using functions with the following command.
```powershell
Get-Help about_Functions
```
#### Using the pipeline
In PowerShell whole objects are passed through the pipeline. The `$_ ` variable represents the current object in the pipeline. For example, the following command retrieves all of the process names on your computer.
```powershell
Get-Process | Foreach-Object {$_.Name}
```
You can also use the `PipelineVariable` parameter to assign the current pipeline object to a variable. The following command retrieves all of the process names on your computer using the `PipelineVariable` parameter.
```powershell
Get-Process -PipelineVariable Process | Foreach-Object {$Process.Name}
```
# Using modules
Modules are packages that contain PowerShell commands such as cmdlets, providers, functions, workflows, variables, and aliases. You can write your own modules and you can also use modules written by other people. The PowerShell Galery is a central repository for sharing and acquiring PowerShell code including PowerShell modules, scripts, and Desired State Configuration resources.

To find modules that are installed in a default module location, but not yet imported into your session, type the following command.
```powershell
Get-Module -ListAvailable
```
The `Get-Module` cmdlet retrieves the modules that have already been imported into your session.

Use the `Find-Module` cmdlet to get a list of all of the modules in the PowerShell Gallery.

The `Install-Module` cmdlet downloads a module from an online gallery and installs it on your computer. The following command downloads and installs the `Azure` module from the PowerShell Gallery.
```powershell
Find-Module -Name Azure | Install-Module
```
The `Import-Module` cmdlet imports a module in your PowerShell session. The following command imports the `Azure` module in your session.
```powershell
Import-Module -Name Azure
```
The following command shows you all of the cmdlets and functions in the Azure module.
```powershell
Get-Command -Module Azure
``` 