# Adding 2 GitHub accounts on same Machine:

- Just create another `id_rsa.pub` ssh file but with different name to avoid existing file overwriting, and most importantly keep that file on same `.ssh` folder.

- Then add a config file in .ssh folder, and write this content in it (can simply use VSCode or `nano ~/.ssh/config`):

```conf
# Account 1
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
    IdentitiesOnly yes

# Account 2
Host github.com-sec-acc # <-- or can add anything in postfix, will use this name later while adding origin in local repo.
    HostName github.com
    User git
    IdentityFile ~/.ssh/<second-id_rsa-file-name>
    IdentitiesOnly yes
```

> Like this we can add many of the github/gitlab/any other accounts on same machine.

- Now for every local repo we want to add on 2nd/3rd/nth account we've to modify the (github/gitlab)'s repo ssh-id while adding the remote origin to the local git folder:

Change: `git@github.com:<github-username>/<repo-name>.git`

to this:

```bash
git remote add origin git@github.com-sec-account:<github-username>/<repo-name>.git
```

This way we can tell git to add which account's repo's origin to the machine to recognise on every fetch and push.