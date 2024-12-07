#!/bin/bash

# Define escape sequences for colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
RESET='\033[0m'

# URL of the ZIP archive
URL="https://advent.inf-lab.dev/material/second/advent-second.zip"

# the name of the zip file that has been downloaded
ZIP_FILE="advent-second.zip"

# Hello World, I guess...
echo -e "${CYAN}${BOLD}🎄 Ho, ho, ho! Welcome! 🎅${RESET} Let's get your files ready! 🎁"

# Download the zip file
echo -e "${BLUE}🔗 Downloading from $URL...${RESET}"
curl -L -o "$ZIP_FILE" "$URL" && echo -e "${GREEN}✅ Download complete!${RESET}"

# Unzip the file
echo -e "${BLUE}📂 Unwrapping the surprise $ZIP_FILE...${RESET}"
unzip "$ZIP_FILE" -d advent-second && rm "$ZIP_FILE"
echo -e "${GREEN}✅ Unwrapping complete!${RESET}"

# Display further instructions
echo -e "${YELLOW}🎅🎄 To continue, run the following commands:${RESET}"
echo -e "${BOLD}   cd advent-second${RESET}"
echo -e "${BOLD}   code task2.c${RESET}"

# End the script
echo -e "${GREEN}✅ Have fun solving the challenge! 🎄${RESET}"