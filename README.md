# Signal-GPT

Allow GPT-4 to respond to your [Signal](https://signal.org/) messages.

## Usage

### Requirements

Install [Docker](https://docs.docker.com/get-docker/).

### Setup

Link this app with your Signal phone number:

```bash
MODE=native docker compose up api
```

Then visit http://localhost:8080/v1/qrcodelink?device_name=signal-api and scan the QR code with your Signal app under Settings > Linked Devices.

Once your device is linked, you can start the app:

```bash
docker compose up
```
