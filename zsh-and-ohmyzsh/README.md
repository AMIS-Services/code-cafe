# ZSH and Oh My Zsh

## Why would you use them?

Because you will be so very very productive! Zsh is targeted towards a developer audience and installing the Oh My Zsh framework on top of it enables you to install plugins for programs and features you often use. You won't need to type out entire git commands for instance, when using the git-plugin you'll have access to almost any git command by just typing 3 characters. After installing ZSH there is no more need to navigate folders by typing `cd`, just type your paths and press enter. There is also no more need to type the entire path, just type the first letter of each directive, as long as the combination is unique you can autocomplete it by pressing tab. Are you worried about learning all the commands of a new shell? Don't! You won't have to learn any new commands to replace bash, you can still use 99% of those.

### Prerequisites

In order to experience ZSHell and OhMyZsh yourself, you will need a Unix-like operating system (Linux or macOS). If you are reading this on a Windows machine, refer to https://github.com/AMIS-Services/code-cafe/tree/master/linux-and-docker-host-on-windows-machine to get instructions on how to set up an Ubuntu environment using VirtualBox.

- curl or wget should be installed
- git should be installed

#### Installing Zsh

Ubuntu:

```console
apt install zsh
```

For other Linux distro's or macOS see https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH

Make Zsh your default shell:

```console
chsh -s $(which zsh)
```

After installation, your version should be greater than 5.1.1

```console
zsh --version
```

### The big Zsh features

1. Autocd option -- "executing" a directory will "cd" to it instead
2. Show exit status of last command
3. Filename correction during completion
4. Shorthand notation for unique combinations of directives: if dir1/x exists and dir2 exists, then "dir/x" `tab` completes to dir1/x
5. `some-command` press `tab` -- expand output of some-command right in your shell line
6. Suffix aliases: Associate files with specific extensions with default applications. E.g.:
   ```console
   $ alias -s cpp=vim
   ```
   Executing test.cpp will open the file using vim
7. Auto-complete: when typing `kill` and pressing `tab` you will see all the processes one can kill
8. Enables you to use Oh My Zsh :)

These are just some of my favorites, for more see:
https://gist.github.com/ashrithr/5793891 and https://code.joejag.com/2014/why-zsh.html

#### Installing Oh My Zsh

via curl

```console
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

via wget

```console
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

#### Configuring plugins

There are lots of plugins available. Browse https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins. Once you see one you like, add it to your .zshrc file.

```console
vi ~/.zshrc
```

#### Themes

### The big Oh My Zsh features

1. Aliases
   `..` instead of `cd ..`
   `...` instead of `cd ../..`
   `....` instead of `cd ../../..`
   etc.
2.
