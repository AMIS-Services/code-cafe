# Linux and Docker Host on Windows machine
In the Code Café, most explorations we will do locally will take place inside a Docker container or at least on a Linux machine. This host or container could run anywhere - including on the cloud. However, it will probably be most convenient to simply run the Linux environment with a Docker engine on your laptop. 

If you happen to have a Windows laptop, this requires a little preparation. For Docker containers only, using the Docker Quickstart Terminal/Docker Desktop is one way of doing so, and to some extent that works fine. But whenever I want to have more control over the Linux environment that runs the Docker host, or I want to run multiple such environments in parallel, I like to just run one or more VMs under my own control and use them to run Docker inside.

The easiest way to create and run a Linux environment with a Docker engine inside is using combination of Vagrant and VirtualBox. VirtualBox runs the VM and takes care of network from and to the VM as well as mapping local directories on the Windows host machine into the VM. Vagrant runs on the Windows machine as a command line tool. It interacts with the VirtualBox APIs, to create, start, pause and resume and stop the VMs. Based on simple declarative definitions – text files – it will configure the VM and take care of it.

The steps to go through in order to have on your Windows laptop a Linux VM with Docker engine inside are these:

1. Download and install VirtualBox - https://www.virtualbox.org/wiki/Downloads 
2. Download and install Vagrant - https://www.vagrantup.com/docs/installation/ and https://www.vagrantup.com/downloads.html 
3. Open a command line, navigate to the (this) directory that contains the Vagrantfile and run `vagrant up`. This will create a VirtualBox VM with Ubuntu 18.04 as operating system and Docker Engine including Docker Compose installed and running. Note that the directory containing the Vagrantfile is mapped into the VM as /vagrant. You can ping the VM `ping 192.168.188.142` (or the IP address that you have configured in the Vagrantfile)
4. Use `vagrant ssh` to open a shell session into the VM. You can then execute `docker ps` to verify which containers are running (none) and verify that docker is installed in the VM. Note: you can run `vagrant ssh` from multiple command line windows to have several parallel Shell sessions on the Linux VM. 
5. Use `docker run hello-world` you can quickly see Docker in action; this will pull and run a container image, show an output message and stop the container (see: https://hub.docker.com/_/hello-world/ for details). With `docker run -it ubuntu bash` you can start the same container and open a shell session into; in this shell session you can run Linux commands such as `ls -l ` and `ps -ef`. Type `exit` to abandon the container session (this also stops the container)  
6. Use `exit` to exit from the vagrant SSH shell session. Use `vagrant halt` on the Windows command line to shutdown the VM. Note that the state of the VM is retained; if you restart using `vagrant up` any changes to the file system are still in tact.

With `vagrant pause` and `vagrant resume` we can create a snapshot of the VM in mid flight and at a later moment (which can be after a restart of the host system) continue where we left off.

Using `vagrant destroy` you can completely remove the VM, releasing the host (disk) resources that were consumed by it.

See: this blog article with a little more details on how to configure and run a Linux and Docker Host VM on a Windows machine:  https://technology.amis.nl/2018/05/21/rapidly-spinning-up-a-vm-with-ubuntu-and-docker-on-my-windows-machine-using-vagrant-and-virtualbox/