#!/usr/bin/env bash
python3 -m http.server 9000

# För att starta utloggat läge så sätt dit klassmodiefierarna för (hidden) på logged-view och logged in view. ta bort token från auth. 
# samt aktivera  auth.token = "";  och auth.userId = "";  i login-form. Det kanske är mer logiskt att lägga denna kontrollen i login-view?

# Api-key middleware är utkommenterad ATM

# Döpte om authorization (api key ) till my-api-key i auth.

# i servern så är automailfunktionen utkommenterad när man registrerar nya TM/PM

#if (isPwValid) är utkommenterad i pulse login

# ändra till let report = await this.report(proj.selectReport); i read-report

# unkommentera // if (!proj.selectReport) {location.hash = "reports";} i read-report-view

# Role är hårdkodat som TM i i början på vissa vyer under tiden som TM utvecklas

# // location.hash = "projects" är utkommenterad i create-project för att undvika redirect när jag skapar nya project i utveckling

#EFTER DEMO 2

#Hidden nav behöver aktiveras i login view
#   auth.role = "PM"; i auth behover tas bort
#  // if (auth.role === "PM") { i olika views behöver kollas över
# rader markerade med //################### ska tas bort i create-project
# auth.userId = 1001 i reports-view behöver tas bort
# auth.role = "TM" behöver ändras i auth
#  'Authorization': `Bearer ${this.jwtForReset}`, ########### kommentera ut dettta u auth rad 29
# uncomment         // auth.userId = 1001 reports-view rad 9.

#       auth.role = "TM" auth.userId = 1001 i project view behöver tas bort