# 🎓 Scolaria – Notes & bulletins multi-établissements (PWA + Supabase)

Chaque école dispose de son **espace isolé** : toutes les données portent un `school_id` et sont protégées par des règles RLS.

## 1. Supabase
1. Créez un projet sur supabase.com.
2. **SQL Editor** : collez `supabase/schema.sql` → *Run*. (Si vous aviez déjà lancé l'ancienne version : lancez d'abord `supabase/reset_v1.sql`, qui efface les données.)
3. **Authentication → Providers → Email** : désactivez *Confirm email*.
4. **Project Settings → API** : copiez *Project URL* et la clé *anon public* dans `index.html` (`SUPABASE_URL`, `SUPABASE_KEY`). Jamais la clé `service_role`.

## 2. GitHub
```bash
git init && git add . && git commit -m "Scolaria v2"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/scolaria.git
git push -u origin main
```
Settings → Pages → Source : **GitHub Actions**.

## 3. Mise en route d'une école
1. Sur la page de connexion : **« Nouvel établissement ? Créer un espace »** → nom de l'école, responsable, email, mot de passe. Le créateur devient administrateur.
2. **🏫 Établissement** : nom, année scolaire, responsable, téléphone, adresse, slogan, logo (repris sur les bulletins).
3. **🏷️ Classes** : cycle (Maternelle / Primaire / Collège / Lycée), niveau, section, effectif max, titulaire ; les matières standard du cycle peuvent être créées automatiquement (modifiables dans *Matières*).
4. **👨‍🏫 Enseignants** : compte, discipline, téléphone et affectation aux classes (cases à cocher).
5. **👥 Élèves**, puis saisie des notes par les enseignants et édition des bulletins.

## Droits
- **Admin** : tout, y compris l'établissement et les comptes.
- **Administration** : classes, enseignants, élèves, matières, notes, bulletins.
- **Enseignant** : saisie des notes de ses matières uniquement.
- Un utilisateur ne voit jamais les données d'une autre école (RLS).

## Notes
- Connexion requise pour les données ; l'interface est installable et mise en cache.
- Le logo est réduit à 256 px et stocké en base (data URL).
- Pensez aux sauvegardes Supabase avant un usage en production.
