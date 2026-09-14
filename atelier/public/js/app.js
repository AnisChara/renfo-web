import { validateMessage, replyTo } from './brain.js';

document.querySelector('#status').textContent = 'Votre point de départ est prêt.';

const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');
const champ = document.querySelector('#message');
const messages = document.querySelector('#messages');

// J1 : interface seule, on bloque l’envoi et on l’explique.
formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statut) {
    statut.textContent = 'Interface prête ; les réponses arrivent au J2.';
  }
  const cleanedMessage = validateMessage(champ.value);
  console.log(cleanedMessage)

  if (!cleanedMessage.ok) {
    statut.textContent = cleanedMessage.error;
    return;
  }

  let message = document.createElement('li');
  message.textContent = "Vous : "+cleanedMessage.value
  messages.append(message);

  let response = document.createElement('li');
  response.textContent = "Cap Web : "+replyTo(cleanedMessage.value)
  messages.append(response);

  champ.value = '';
  champ.focus();
  statut.textContent = "";

});

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
