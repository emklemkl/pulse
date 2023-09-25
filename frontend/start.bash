#!/usr/bin/env bash
python3 -m http.server 9000

# För att starta utloggat läge så sätt dit klassmodiefierarna för (hidden) på logged-view och logged in view. ta bort token från auth. 
# samt aktivera  auth.token = "";  och auth.userId = "";  i login-form. Det kanske är mer logiskt att lägga denna kontrollen i login-view?