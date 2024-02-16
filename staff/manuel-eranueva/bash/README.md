# BASH

Command-line interface commands typical in BASH.

## pwd - path to working directory

```sh
$ pwd

/Users/manueleranueva
```

## ls - list files / folders

```sh
$ ls

Desktop
Documents
workspace
```

## ls -l - list file with details

```sh
$ ls -l

drwxr-xr-x  4 ManuelDeLaEranueva  staff  128  5 feb 16:42 helloworld
drwxr-xr-x  4 ManuelDeLaEranueva  staff  128  5 feb 13:42 isdi-bootcamp-202402
```

## ls -a - list hidden

```sh
$ ls -a 
```

## mkdir - make directory

```sh
$ mkdir "folder-name"
```

## cd - change directory

```sh
$ cd "direcotry-name"
```

## mv - move

```sh
$ mv document1.js files1/document1.js
```

```sh
$ mv hello.world folder-a/folder-b/folder_c
```

## touch - creates a folder

```sh
$ touch "folder-name"
```

## kill - kill process

```sh
$ kill -9 "num-task"
```

## tree - ahows the files in a tree shape

```sh
$ tree workspace
```

## rm -rf - remove file without asking

```sh
$ rm -rf "folder-name"
```

## rsync -va --del <from> <to> (synchronizes all files and folders from-to)

```sh
$ rsync va --del ./pepe/Users/my-user/pepe
```

## top - look at the processes that are working

```sh
$ top
```