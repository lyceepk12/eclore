# 🎓 Scolaria – Notes & bulletins (PWA + Supabase)

## 1. Supabase
1. Créez un projet sur supabase.com.
2. **SQL Editor** → collez `supabase/schema.sql` → *Run*.
3. **Authentication → Providers → Email** : désactivez *Confirm email*.
4. **Authentication → Users → Add user** : créez votre compte (cochez *Auto confirm*). **Le premier compte devient automatiquement administrateur.**
5. **Project Settings → API** : copiez *Project URL* et la clé *anon public*, puis collez-les en haut du script de `index.html` (`SUPABASE_URL`, `SUPABASE_KEY`).
   La clé anon est publique par conception : la protection vient des règles RLS du schéma. N'utilisez **jamais** la clé `service_role` dans l'application.

## 2. GitHub
```bash
cd scolaria-pwa
git init && git add . && git commit -m "Scolaria"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/scolaria.git
git push -u origin main
```
Sur GitHub : **Settings → Pages → Source : GitHub Actions**. Le site est en ligne à chaque push (`https://VOTRE-COMPTE.github.io/scolaria/`).

## 3. Utilisation
- Connectez-vous avec le compte admin → onglet **Comptes** : créez les enseignants et l'administration (rôle choisi à la création, modifiable ensuite).
- Onglet **Matières** : affectez chaque matière à une classe et un enseignant (c'est ce qui limite sa saisie).
- Droits appliqués par la base (RLS), pas seulement par l'interface : l'enseignant ne peut lire/écrire que les notes de ses matières ; l'administration gère élèves, matières, notes, bulletins ; seul l'admin gère les comptes.
- Un compte inscrit sans validation reste « En attente » et ne voit rien.

## Notes
- L'application nécessite une connexion pour les données (le shell est mis en cache et installable).
- Pensez aux sauvegardes Supabase (Database → Backups) avant un usage en production.
