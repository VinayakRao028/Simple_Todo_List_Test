#!/bin/bash

# Setup Python environment
echo "Setting up Python environment..."
python3 -m venv venv
source venv/bin/activate
pip install pycodestyle

# Setup Node.js environment
echo "Setting up Node.js environment..."
if command -v nvm &> /dev/null
then
    nvm use 14
else
    echo "NVM not found. Please install NVM and Node.js v14"
    exit 1
fi

npm install

echo "Setup complete!"