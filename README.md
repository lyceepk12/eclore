# 🎓 Scolaria – Notes & bulletins multi-établissements (PWA + Supabase)

Chaque école dispose de son **espace isolé** : toutes les données portent un `school_id` et sont protégées par des règles RLS.

## 1. Supabase
1. Créez un projet sur supabase.com.
2. **SQL Editor** : collez `supabase/schema.sql` → *Run*. (Si vous aviez déjà lancé l'ancienne version : lancez d'abord `supabase/reset_v1.sql`, qui efface les données.)
3. **Authentication → Providers → Email** : désactivez *Confirm email*.
4. Les clés du projet sont déjà intégrées dans `index.html` (`SUPABASE_URL`, `SUPABASE_KEY` anon). Jamais la clé `service_role`.

## 2. GitHub
```bash
git init && git add . && git commit -m "Scolaria v2"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/scolaria.git
git push -u origin main
```
Settings → Pages → Source : **GitHub Actions**.

## 3. Super administrateur (propriétaire de la plateforme)
1. Lancez dans l'ordre : `schema.sql`, `migration_v3.sql`, `migration_v4.sql`, `migration_v5.sql` (n'exécutez que ceux qui manquent si votre projet existe déjà).
2. Authentication → Users → *Add user* (email + mot de passe, *Auto confirm* coché) — utilisez un email dédié.
3. SQL Editor : `update profiles set role='super', school_id=null where login='VOTRE@EMAIL';`
4. Connectez-vous : onglet **🏢 Établissements** pour créer une école (nom, responsable, année, email + mot de passe de son administrateur), la suspendre ou la supprimer. Il n'y a **plus d'inscription publique**.

## 4. Mise en route d'une école (par son administrateur)
1. **🏫 Établissement** : nom, année, responsable + fonction, téléphone, email, adresse, slogan, **logo** et **signature**.
2. **📚 Matières** : catalogue des matières de l'école (puis coefficients par classe).
3. **🏷️ Classes** : cycle, niveau, section, effectif max, professeur principal ; matières standard du cycle en option.
4. **👨‍🏫 Enseignants** : la discipline se choisit parmi les matières enregistrées ; affectation aux classes (seuls les enseignants de la même discipline sont proposés pour une matière).
5. **👥 Élèves** : nom, matricule, date de naissance, classe, photo.
6. **📄 Bulletins** : absences, appréciation et conduite par trimestre, puis *Imprimer / Enregistrer en PDF* (un élève ou toute la classe).

## Nouveautés v4
- Enseignants modifiables (nom, téléphone, disciplines, mot de passe) ; un enseignant peut avoir plusieurs disciplines et être affecté à plusieurs classes/matières.
- Groupes **Filles / Garçons** par matière (EPS : un enseignant par groupe). Renseignez le **sexe** des élèves.
- Super admin : bouton **Ouvrir** sur chaque école (mode support, accès complet), **Suspendre / Réactiver**, **échéance d'abonnement** (blocage automatique), réinitialisation du mot de passe.
- Import Excel des élèves et des enseignants (bouton « Modèle » pour le format).

## Nouveautés v5
- **📅 Trimestres** : date de clôture et verrouillage par trimestre ; prolongations (tous les enseignants ou un seul). L'administration peut toujours saisir. La règle est appliquée par la base (impossible de la contourner).
- **🗓 Années** : bascule d'année (ex. 2026-2027 → 2027-2028). L'ancienne année est archivée en lecture seule (consultation des élèves et des bulletins) ; la nouvelle reprend les classes au niveau supérieur, leurs matières/enseignants et les élèves (les élèves de Tle sortent). Les redoublants se déplacent depuis la fiche élève.

## Droits
- **Admin** : tout, y compris l'établissement et les comptes.
- **Administration** : classes, enseignants, élèves, matières, notes, bulletins.
- **Enseignant** : saisie des notes de ses matières uniquement.
- Un utilisateur ne voit jamais les données d'une autre école (RLS).

## Notes
- Connexion requise pour les données ; l'interface est installable et mise en cache.
- Le logo est réduit à 256 px et stocké en base (data URL).
- Pensez aux sauvegardes Supabase avant un usage en production.
