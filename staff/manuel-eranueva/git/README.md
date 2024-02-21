# GIT

Command-line interface comands typical in GIT

## git log --- Shows a list of commits ---

```sh
$ git log
```

## git log --graph --- Shows a list of branches in a line ---

```sh
$ git log --graph
```

## git branch --- Shows all the current branches ---

```sh
$ git branch
```

## git branch -D feature/git --- Deletes the branch 'feature/git' ---

```sh
$ git branch -D feature/git
```

## git branch develop --- Creates a new branch called 'develop' ---

```sh
$ git branch develop
```

## git checkout develop --- Moves to a branch named 'develop' ---

```sh
$ git checkout develop
```

## git add develop --- adds new or changed files (in this case, develop) in your working directory to the Git staging area ---

```sh
$ git add develop
```

## git commit --- Creates a new commit of the content just added. It must always be followed by a message explaining the changes ---

```sh
$ git commit -m 'Implement original code of origin #88'
```

## git push --- Uploads the latest commit ---

```sh
$ git push
```


## git push -u origin develop --- Uploads the latest commit to the branch called 'develop'---

```sh
$ git push -u origin develop
```

## git push -f --- Replaces the latest push with the current one ---

```sh
$ git push -f
```