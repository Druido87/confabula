// Istruzioni che valgono in tutte le scene
function istruzioniGenerali() {
	titolo("La casa");
	messaggiRifiuto("Prova qualcos'altro...|No, questo no...|Non ci siamo...|Mmmmmm...");
	rispondi("quit|exit|esci dal [gioco|storia|avventura]", "Per uscire chiudi la scheda del browser. Se desideri ricominciare daccapo puoi aggiornare la pagina del browser o scrivere 'restart'.");
	rispondi("restart", "Ricaricare tutto comporterà la perdita delle informazioni sulla partita in corso. Per confermare scrivi 'restart!' con il punto esclamativo.");
	rispondiVai("restart!", "Ok! Ricarico tutto...", 1);
	uscita("guardo", 0, "invisibile");
	rispondi("vocabolario|v", "accendo, aiuto, apro, aspetto, bevo, entro, esamino, esco, forzo, guardo, inventario, leggo, mangio, osservo, prendo, rompo, scendo, sfondo, sollevo, spengo, uccido, verso");
	contenitore("i", "");
	rispondi("inventario|i", "Hai con te: @i@.");
	rispondi("aiuto", "Mi dispiace, ora non posso aiutarti.");
	rispondi("aspetto", "Il tempo passa...");
	rispondi("nord|sud|ovest|est|su|giù", "Non è possibile procedere in quella direzione.");
	rispondi("istruzioni", "Scrivi in prima persona o usa l'imperativo. Puoi omettere gli articoli e il predicato 'esamino'. Scrivi 'vocabolario' o 'v' per leggere i predicati disponibili; 'guardo' o 'g' per rileggere una scena; 'inventario' o 'i' per consultarlo; 'istruzioni' quando vuoi rileggerle. Raggiungi un luogo già visitato scrivendo 'direzione' o 'd' e 'nome luogo'. I luoghi raggiungibili sono consultabili scrivendo 'direzioni' o 'd'. I luoghi possono avere comportamenti speciali.");
	condizioni("il libro@i");
		rispondi("[leggo|esamino] il libro", "Il libro è il diario dell'ultimo inquilino della casa. Mancano diverse pagine, ciononostante comprendi che sulla casa incombe un'antica maledizione a causa di atroci delitti lí perpetrati. Solo la Fiamma Purificatrice potrà estinguere la catena di morte.");
	condizioni("la candela@i+i fiammiferi@i");
		rispondi("accendo la candela con i fiammiferi", "Hai acceso la candela.");
		_oggetti("la candela accesa@i+no!la candela@i");
	condizioni("la candela@i");
		rispondi("accendo la candela", "Devi servirti di qualcosa per accenderla.");
	condizioni("no!la candela@i");
		rispondi("accendo la candela [|con i fiammiferi]", "Non hai una candela...");
	condizioni("no!i fiammiferi@i");
		rispondi("accendo la candela con i fiammiferi", "Non hai dei fiammiferi...");
	condizioni("la candela accesa@i");
		rispondi("spengo la candela [|accesa]", "Soffi sulla candela e la spegni.");
		_oggetti("la candela@i+no!la candela accesa@i");
	condizioni("il cacciavite@i");
		rispondi("esamino il cacciavite", "È un cacciavite con la punta piatta per viti grandi.");
	condizioni("i medicinali@i");
		rispondi("esamino i medicinali", "È una scatoletta con qualche pomata di vario utilizzo, dei cerotti, e altre piccole cose...");
	condizioni("i medicinali@i");
		rispondi("mangio i medicinali", "Non ci sono pasticche tra i medicinali.");
	condizioni("la bottiglietta d'alcol@i");
		rispondi("esamino l'alcol|esamino la bottiglietta [|d'alcol]", "È alcol puro, facilmente infiammabile.");
	condizioni("la bottiglietta d'alcol@i");
		rispondi("verso l'alcol|verso la bottiglietta [|d'alcol]", "Versi il liquido infiammabile dappertutto e appicchi il fuoco. Subito le fiamme si propagano.");
		_variabili("incendio");
	condizioni("incendio", per => {
		nMosseRispondi(2, "Fuoco e fiamme sono ormai dappertutto...");
		nMosseVai(4, 10);
	});
}
// Istruzioni specifiche per ciascuna scena
function istruzioniScena(n) {
	Vista.preparaScena(n);
	switch (n) {
	case 1:
		testo("<br /><span style=\"color:#d7d7d7;font-size:22px;\">LA CASA © MMXVII</span><br /><img src=\"casa.png\" style=\"width:468px; height:280px;\" /><br />Un'insaziabile creatura attende nel buio...<br /><br />", "centrato");
		scegliVai("Entra", 5, "centrato");
		scegliRispondi("Istruzioni", "", "centrato");
		scegliRispondi("Principi etici", "Principi derivanti dalla <a href=\"http://ifarchive.smallwhitehouse.org/if-archive/info/Craft.Of.Adventure.pdf\" target=\"_blank\">Carta dei diritti del giocatore</a> di Graham Nelson ed ulteriormente rielaborati:</p><ol><li><b>Dichiarare i principi etici.</b> Ogni storia interattiva dovrebbe dichiarare i principi che adotta affinché il giocatore sappia quale trattamento attendersi.</li><li><b>Fornire le istruzioni.</b> All'inizio del gioco vanno sempre offerte le istruzioni complete.</li><li><b>Giocabilità prioritaria sul realismo.</b> Funzionalità e scorrevolezza della storia devono essere soddisfatte, anche con espedienti irreali o comandi scorciatoia, piuttosto che rispettare un rigido realismo che guasta la giocabilità con procedure pedanti o altrimenti fastidiose.</li><li><b>Tempo che scorre con le mosse.</b> Il tempo reale può condizionare messaggi scenici o effetti grafici, ma non deve far scorrere la storia. Questa avanza solo con le mosse del giocatore.</li><li><b>Mappa automatica o navigazione comoda.</b> La mappa dei luoghi non deve gravare sulla memoria del giocatore. Essa può essere generata automaticamente, o risultare superflua, od altri espedienti devono consentire una comoda navigazione tra i tanti luoghi.</li><li><b>Supporto dei comandi tradizionali.</b> Supporto degli imperativi e dei comandi: esamina, x (examine); guarda, g, l (look); nord, n; sud, s; ovest, o, w (west); est, e; load; save; quit, exit. </li><li><b>Superamento del vocabolario.</b> Il gioco può offrire alcuni predicati d'esempio per stimolare i nuovi giocatori, ma deve comunque supportare molti sinonimi e gestire tutte le azioni ragionevoli ed interessanti che si possono compiere coerentemente con la storia.</li><li><b>Testi concisi e molto curati.</b> Una storia interattiva richiede che si ripercorra più volte uno stesso testo, fatta eccezione per l'introduzione, speciali fasi intermedie ed il finale, i testi devono essere brevi, e sempre stilisticamente molto curati.</li><li><b>Interazione con luoghi ed oggetti nominati.</b> I testi delle scene presentano luoghi ed oggetti. Se essi vengono nominati si devono poter almeno osservare o esaminare.</li><li><b>Minimizzare le risposte superflue.</b> Inutile gestire azioni banali per offrire risposte banali, tanto vale lasciare la risposta generica di rifiuto, oppure offrire una risposta ben curata che crei atmosfera.</li><li><b>Evitare morti improvvise.</b> Gli eventi pericolosi, in particolare una morte improvvisa, devono essere segnalati da un ragionevole indizio. In caso di morte od altra interruzione della storia, un sistema di caricamento comodo della partita deve minimizzare gli aspetti noiosi.</li><li><b>Evitare indizi incomprensibili.</b> Gli indizi non possono essere esageratamente indiretti e quindi incomprensibili, è apprezzabile discostarsi dall'ovvietà, ma occorre farlo nella giusta misura.</li><li><b>Dare tutte le informazioni.</b> Un ostacolo che si presenta per la prima volta deve essere accompagnato da tutte le informazioni necessarie al suo superamento. I fallimenti che interrompono la storia non possono far parte delle informazioni necessarie per la sua soluzione.</li><li><b>Mai rimaner bloccati senza saperlo.</b> Finché è possibile compiere azioni, si deve poter arrivare ad un finale apprezzabile. Non si può rimanere impossibilitati a proseguire (ora o in futuro) senza avvertimento. Se ciò accade, la storia deve terminare.</li><li><b>Non richiedere azioni improbabili.</b> Una combinazione accidentale ed improbabile di mosse non deve determinare l'ottenimento di qualcosa di necessario al proseguimento del gioco. Il rischio è rendere molto probabile una situazione di blocco di fatto.</li><li><b>Azioni coerenti con lo scopo della storia.</b> Azioni inutili o stupide o fuori luogo è impossibile gestirle tutte. Ci si deve attenere ad uno o massimo due approcci (serio, comico, realistico, fantastico, ecc.). Se il giocatore vede certe azioni rifiutate non deve insistere, ma deve agire in modo coerente o cambiare storia interattiva.</li><li><b>Offrire variazioni ed alternative.</b> Sono auspicabili, seppure non necessarie e a discrezione dell'autore, scelte di personaggi, biforcazioni della trama, alternative al superamento di ostacoli, messaggi variabili, eventi casuali, finali multipli, ecc.</li><li><b>Ricerche circoscritte o chiari obiettivi.</b> Un oggetto da trovare tra tantissimi luoghi visitabili diventa una lunga e noiosa ricerca. Il contesto deve essere ristretto, oppure un compito esplicito va comunicato al giocatore affinché abbia un chiaro obiettivo in un ampio contesto.</li><li><b>Evitare depistaggi senza chiarimenti.</b> Oggetti e luoghi sono scelti con un fine (scenico, funzionale, umoristico, ecc.). Oggetti inutili o depistanti vanno evitati, o comunque non possono essere troppo appariscenti o con varie possibilità di interazione, senza poter capire che sono depistaggi e dunque abbandonarli.</li><li><b>Indicatori di completamento.</b> Almeno un indicatore di completamento deve segnalare quanto manca alla conclusione della storia interattiva.</li></ol>", "centrato");
		scegliRispondi("Licenza", "LA CASA © MMXVII è una rivisitazione dell'avventura testuale LA CASA © MCMLXXXVIII pubblicata sulla rivista Amiga Byte n.7 come opera di pubblico dominio, liberamente copiabile e distribuibile senza scopo di lucro. <a href=\"https://github.com/Druido87/Confabula\" target=\"_blank\">Confabula</a> è l'interprete JavaScript per creare ed eseguire avventure testuali, rilasciato da <a href=\"https://github.com/Druido87\" target=\"_blank\">Druido87</a> con licenza <a href=\"https://github.com/Druido87/Confabula/blob/master/LICENSE\" target=\"_blank\">GNU L-GPL</a>. La storia rivisitata è un esempio di utilizzo di Confabula.", "centrato");
		break;
	case 2:
		nomeLuogo("soggiorno");
		immagine("soggiorno.png");
		testo("Ti trovi nel soggiorno. Il soffitto è sorretto da grosse travi, mentre le pareti recano evidenti tracce di umidità.<br />Puoi vedere: un divano, un tappeto, un tavolo, un mobile, un caminetto, dei quadri ed un pendolo.");
		condizioni("botola aperta");
			testo("Una botola è stata aperta.");
		uscita("ovest", 6);
		uscita("est", 5);
		uscita("sud", 4);
		rispondi("esamino il divano", "Si tratta di un divano con disegni a fiori. Il tessuto è logoro e strappato in piú punti.");
		rispondi("esamino il tappeto", "Il tappeto è ricoperto di polvere; in un angolo vi è una macchia scura.");
		rispondi("sollevo il tappeto", "Sotto il tappeto c'è una botola.");
		rispondi("esamino il tavolo", "Vedi una bottiglia e dei giornali.");
		rispondi("esamino la bottiglia", "La bottiglia è scura e contiene una sostanza oleosa.");
		rispondi("[bevo|prendo] la bottiglia", "Assetato bevi avidamente. Corri al bagno, ma è troppo tardi... la bottiglia conteneva olio di ricino avariato.");
		rispondi("[esamino|leggo] i giornali", "Alla pagina delle inserzioni noti l'avviso di vendita di una casa, 4 stanze piú cantina, in una sperduta località di montagna chiamata 'Green Moutain'.");
		rispondi("esamino il mobile", "Si tratta di un mobile bar con uno sportello.");
		rispondi("apro lo sportello", "All'interno c'è solo un fiaschetto di whisky vuoto.");
		rispondi("esamino il [fiaschetto|fiasco|fiaschetto di whisky|whisky]", "Il fiaschetto è proprio vuoto e non ti serve.");
		rispondi("esamino il caminetto", "Sul caminetto è appeso un fucile. Tra la cenere noti qualcosa di strano...");
		rispondi("prendo il fucile", "Meglio di no. È pericoloso... Potresti farti male!");
		rispondiVai("esamino la cenere", "Sulla cenere vi sono impronte non umane. All'improvviso dalla canna fumaria esce un mostro...", 3);
		rispondi("esamino i quadri", "Sono strani ritratti di famiglia.");
		rispondi("sollevo i quadri", "Dietro i quadri non scopri nulla di rilevante.");
		rispondi("esamino il pendolo", "L'orologio, pieno di polvere e ragnatele, è fermo con le lancette sulle 12. Mezzanotte è l'ora delle streghe.");
		condizioni("il cacciavite@i");
			rispondi("forzo la botola con il cacciavite", "Hai aperto la botola. Sotto è molto buio.");
			_variabili("botola aperta");
		condizioni("no!botola aperta", per => {
			rispondi("apro la botola", "Non riesci ad aprire la botola. Ti servirebbe qualcosa per far leva...");
			rispondi("forzo la botola", "Devi servirti di qualcosa per forzare la botola.");
			condizioni("no!il cacciavite@i");
				rispondi("forzo la botola con il cacciavite", "Non hai un cacciavite...");
		});
		condizioni("botola aperta", per => {
			condizioni("la candela accesa@i");
				rispondiVai("giù|cantina|[entro|scendo] [|nella botola]", "Ti introduci nella botola con la candela accesa...", 7);
			condizioni("no!la candela accesa@i");
				rispondiVai("giù|cantina|[entro|scendo] [|nella botola]", "Ti introduci nella botola...", 8);
			uscita("giù", 7, 'esplorabile');
		});
		break;
	case 3:
		immagine("mostro.png");
		testo("Il mostro immondo ti afferra e affonda il coltello nella tua gola. Sei finito!");
		scegliVai("Ricomincia", 1);
		break;
	case 4:
		nomeLuogo("camera da letto|camera");
		immagine("camera.png");
		testo("Sei nella camera da letto. La stanza è piena di polvere.<br />Puoi vedere: un armadio, un letto, un comodino ed una sedia.");
		uscita("nord", 2);
		rispondi("aiuto", "A volte sotto i mobili si può trovare qualcosa di interessante.");
		rispondi("esamino l'armadio", "All'interno del mobile vedi dei vecchi vestiti a brandelli ed ammuffiti.");
		rispondi("esamino i vestiti", "Alcuni indumenti sono laceri e macchiati di sangue.");
		contenitore("sotto armadio", "un|il libro");
		condizioni("il libro@sotto armadio");
			rispondi("guardo sotto l'armadio", "Vedi un vecchio libro rilegato in pelle.");
		condizioni("il libro@sotto armadio");
			rispondi("prendo il libro", "Hai preso il libro.");
			_oggetti("il libro@i+no!il libro@sotto armadio");
		rispondiVai("[esamino|guardo sotto] il letto", "Ti chini per guardare sotto il letto; là sotto qualcosa si muove...", 3);
		contenitore("comodino", "una|la candela");
		condizioni("la candela@comodino");
			rispondi("esamino il comodino", "All'interno del comodino trovi una candela.");
		condizioni("la candela@comodino");
			rispondi("prendo la candela", "Hai preso la candela.");
			_oggetti("la candela@i+no!la candela@comodino");
		rispondi("esamino la sedia", "È una sedia di legno in stile Luigi XIV.");
		break;
	case 5:
		nomeLuogo("cucina");
		immagine("cucina.png");
		testo("Ti trovi nella cucina. L'ambiente è piuttosto freddo e dà la sensazione che qui sia accaduto qualcosa di sinistro. Affianco alla porta di ingresso è posto il contatore generale. Un antiquato arredamento da cucina offre una credenza, una madia, un lavabo, un cucinino, un forno a legna ed un tavolo al centro della stanza.");
		uscita("ovest", 2);
		condizioni("no!trappola");
			effetto("Un rumore di serratura alle tue spalle ed ora sei chiuso dentro.", 800, "parole", 300);
			_variabili("trappola");
		rispondi("esamino la porta", "È la massiccia porta di rovere dalla quale sei entrato.");
		rispondi("apro la porta|esco", "La porta è chiusa a chiave. Eppure, quando sei entrato, era aperta. Non sarà facile riaprirla.");
		condizioni("no!la chiave@i");
			rispondi("apro la porta con la chiave", "Purtroppo, le chiavi di questa casa non sono con te...");
		rispondi("sfondo la porta", "È davvero massiccia e resistente, insistendo potresti giusto romperti una spalla.");
		rispondi("[busso|picchio|calcio] [alla|la] porta", "Nessuno potrà sentirti, questa casa è piuttosto isolata.");
		rispondi("esamino la credenza", "Gli sportelli a vetro riflettono una pallida figura umana e non comprendi se sei tu o qualcos'altro.");
		rispondiVai("apro la [credenza|sportelli]|esamino gli sportelli|[busso|picchio|sfondo] [alla|la] credenza", "Avvicini il volto alla credenza. D'un tratto i vetri si infrangono, dall'interno del mobile due braccia ti afferrano...", 3);
		rispondi("esamino la madia", "Senti odore di muffa vicino alla madia. Sopra appoggiata c'è una bottiglia.");
		rispondi("esamino la bottiglia", "È una bottiglia vuota e l'odore lascia intuire che contenesse aceto.");
		rispondi("prendo la bottiglia", "Non pensi che una bottiglia vuota possa servirti...");
		rispondi("apro la madia", "Apri lentamente la madia e dentro trovi una testa umana semi ricoperta da barbe di muffa. Inorridito, richiudi.");
		rispondi("chiudo la madia", "È già chiusa.");
		rispondi("esamino il lavabo", "Il lavabo è vuoto, ma chiazze rosso scure rivelano che del sangue è stato versato.");
		contenitore("cucinino", "dei|i fiammiferi");
		condizioni("i fiammiferi@cucinino");
			rispondi("esamino il cucinino", "Sul cucinino vi sono dei fiammiferi.");
		condizioni("no!i fiammiferi@cucinino");
			rispondi("esamino il cucinino", "Sul cucinino non c'è niente di appoggiato.");
		condizioni("i fiammiferi@cucinino");
			rispondi("prendo i fiammiferi", "Hai preso i fiammiferi.");
			_oggetti("i fiammiferi@i+no!i fiammiferi@cucinino");
		rispondi("esamino il forno [|a legna]", "Il forno a legna contiene resti umani carbonizzati.");
		rispondi("esamino il tavolo", "Sul tavolo ci sono coltelli da cucina insanguinati ed un paio di forbici. Preferisci non toccare nulla. Se ti servirà qualcosa, meglio arnesi non coinvolti in qualche crimine.");
		rispondi("esamino il contatore [|generale]", "Il contatore gira all'impazzata nonostante le luci delle stanze siano spente.");
		condizioni("la chiave@i+incendio");
			rispondiVai("apro la porta con la chiave", "Hai aperto la porta ed esci...", 12);
		condizioni("la chiave@i+no!incendio");
			rispondiVai("apro la porta con la chiave", "Hai aperto la porta ed esci...", 13);
		break;
	case 6:
		nomeLuogo("bagno");
		immagine("bagno.png");
		testo("Ti trovi nel bagno. Si tratta di un ambiente angusto dalle pareti rivestite in legno di abete e con il pavimento piastrellato.<br />Puoi vedere: le assi di legno, un armadietto, un lavandino, la vasca da bagno, uno specchio, il wc ed un armadio.");
		uscita("est", 2);
		rispondi("aiuto", "Noti niente di strano qua dentro?");
		rispondi("[esamino|apro] l'armadietto", "L'armadietto contiene: @armadietto bagno@.");
		contenitore("armadietto bagno", "un|il cacciavite+dei|i medicinali+una|la bottiglietta d'alcol");
		condizioni("il cacciavite@armadietto bagno");
			rispondi("prendo il cacciavite", "Hai preso il cacciavite.");
			_oggetti("il cacciavite@i+no!il cacciavite@armadietto bagno");
		condizioni("i medicinali@armadietto bagno");
			rispondi("prendo i medicinali", "Hai preso i medicinali.");
			_oggetti("i medicinali@i+no!i medicinali@armadietto bagno");
		condizioni("la bottiglietta d'alcol@armadietto bagno");
			rispondi("prendo [l'alcol|la bottiglietta|la bottiglietta d'alcol]", "Hai preso la bottiglietta d'alcol.");
			_oggetti("la bottiglietta d'alcol@i+no!la bottiglietta d'alcol@armadietto bagno");
		rispondi("esamino il lavandino", "Il lavandino è lordo di sangue fresco. Dentro c'è un coltello da cucina anch'esso insanguinato.");
		rispondi("[esamino|prendo] il coltello", "Date le condizioni è meglio non toccarlo...");
		rispondi("esamino la vasca [|da bagno]", "Dentro la vasca vi è il cadavere di un uomo con la trachea squarciata.");
		rispondi("esamino il cadavere", "Riconosci l'agente immobiliare col quale avevi un appuntamento qui.");
		rispondi("esamino lo specchio", "Nello specchio vedi riflessa la tua immagine, ma deformata da una luce sinistra e diabolica.");
		rispondi("esamino il wc", "Cosa ci trovi di tanto speciale in un normalissimo cesso?");
		rispondi("esamino l'armadio", "Nell'armadio vi sono delle catene arruginite.");
		condizioni("il cacciavite@armadietto bagno");
			rispondi("esamino il cacciavite", "È un cacciavite con la punta piatta per viti grandi.");
		condizioni("i medicinali@armadietto bagno");
			rispondi("esamino i medicinali", "È una scatoletta con qualche pomata di vario utilizzo, dei cerotti, e altre piccole cose...");
		condizioni("i medicinali@armadietto bagno");
			rispondi("mangio i medicinali", "Non ci sono pasticche tra i medicinali.");
		condizioni("la bottiglietta d'alcol@armadietto bagno");
			rispondi("esamino [l'alcol|la bottiglietta|la bottiglietta d'alcol]", "È alcol puro, facilmente infiammabile.");
		rispondi("esamino le assi [|di legno]", "Le assi di legno che formano le pareti sono marce.");
		condizioni("no!assi sfondate");
			rispondi("[sfondo|rompo] le assi", "Devi aiutarti con qualcosa per sfondarle.");
		condizioni("la scure@i+no!assi sfondate");
			rispondi("[sfondo|rompo] le assi [|di legno|marce] con la scure", "Impugni l'ascia e colpisci le assi. Dietro le assi fracassate intravvedi una buia cavità.");
			_variabili("assi sfondate");
		condizioni("assi sfondate");
			testo("Dietro le assi che hai sfondato c'è una buia cavità.");
		condizioni("assi sfondate");
			rispondi("[esamino|osservo] la [|buia] cavità [|segreta]", "È abbastanza grande da poterci entrare. Giunge un rivoltante odore dall'interno...");
		condizioni("assi sfondate");
			rispondiVai("entro|entro nella [cavità|buia cavità|cavità segreta]|ovest", "Ti fai coraggio, chinando la testa e passando lateralmente col corpo, ti introduci nella cavità...", 9);
		condizioni("assi sfondate");
			uscita("ovest", 9, 1);
		break;
	case 7:
		nomeLuogo("cantina");
		immagine("cantina.png");
		testo("Ti trovi nella cantina. L'ambiente umido e buio è pervaso da un pungente odore di muffa e roba marcia.<br />Puoi vedere: alcuni scaffali, delle bottiglie, un baule e delle scatole. La debole candela lascia alcune zone in ombra.");
		rispondiVai("su|esco [|dalla botola]", "Sali su una scaletta che ti riporta fuori dalla botola...", 2);
		uscita("su", 2);
		rispondi("esamino gli scaffali", "Sono robusti scaffali in legno di quercia ricoperti di polvere.");
		rispondi("esamino le bottiglie", "Si tratta di bottiglie di vino. Alcune sono ancora piene. Su una bottiglia vi è la data 'gennaio 1824'.");
		rispondi("esamino il baule", "È un grande e pesante baule dall'aspetto inquietante.");
		rispondiVai("apro il baule", "Sollevando il pesante coperchio apri la cassa. Dall'interno balza fuori un essere mostruoso...", 3);
		rispondi("[esamino|apro] i libri", "Sono libri di stregoneria e magia nera.");
		rispondi("leggo i libri", "I libri parlano di demoni immondi, arcani riti, maledizioni, ecc. Tra le ingiallite pagine di un libro, alla voce 'maghi del software' vi è la scritta in caratteri maiuscoli: 'DJ SOFT Via Papa Giovanni XXIII, 28 31015 Conegliano (TV)'.");
		rispondi("esamino le scatole", "Le scatole contengono libri ammuffiti.");
		rispondi("[osservo|esamino] la [cantina|ombre|zone in ombra]", "Osservi attentamente la cantina, nella penombra adagiata sul pavimento vedi una scure.");
		contenitore("penombra cantina", "una|la scure");
		condizioni("la scure@penombra cantina");
			rispondi("prendo la scure", "Hai preso la scure.");
			_oggetti("la scure@i+no!la scure@penombra cantina");
		condizioni("la candela accesa@i");
			rispondiVai("spengo la candela [|accesa]", "Soffiando sulla candela, la fiamma trema un'ultima volta e ti ritrovi al buio...", 8);
			_oggetti("la candela@i+no!la candela accesa@i");
		break;
	case 8:
		intermezzo("Senti l'ombra densa e pesante qua sotto. Senza una causa ragionevole, la botola si chiude con un tonfo...");
		testo("Sei al buio completo. Non vedi niente.<br />Puoi vedere: assolutamente niente.<br />Uscite visibili: nessuna.");
		scegliVai("Ricomincia", 1);
		break;
	case 9:
		immagine("zombie.png");
		testo("Sei nella cavità dietro le assi che rivestivano il bagno. Nell'aria c'è una puzza insopportabile.<br />Puoi vedere: un cadavere in avanzato stato di decomposizione, una nicchia.");
		nomeLuogo("cavità segreta|cavità|buia cavità");
		condizioni("no!zombie morto");
			rispondi("est|bagno", "Il cadavere ti afferra per una caviglia e non ti lascia andare.");
		condizioni("zombie morto");
			uscita("est", 6);
		condizioni("la scure@i");
			rispondi("uccido lo zombie con la scure", "Col cranio fracassato, il mostro crolla al suolo.");
			_variabili("zombie morto");
		condizioni("no!la scure@i");
			rispondi("uccido lo zombie con la scure", "Non hai una scure con te...");
		condizioni("no!zombie morto");
			nMosseRispondi(1, "Il corpo decomposto si muove! Hai davanti uno zombie!!! Devi agire subito...");
		condizioni("no!zombie morto");
			nMosseVai(2, 11);
		condizioni("no!la chiave@i");
			rispondi("esamino la nicchia", "All'interno della nicchia, per terra, vedi una pergamena lacera e ingiallita dal tempo.");
		condizioni("no!la chiave@i");
			rispondi("[esamino|leggo|prendo] la pergamena", "Sulla pergamena è scritto qualcosa che però è ormai illeggibile. Avvolta nel rotolo trovi una chiave e la prendi.");
			_oggetti("la chiave@i");
		condizioni("la chiave@i");
			rispondi("esamino la chiave", "Potrebbe essere la chiave della porta principale in cucina.");
		rispondi("esamino il cadavere", "Ha un aspetto terribile...");
		break;
	case 10:
		testo("La casa è ormai interamente avvolta dalle fiamme. Alte lingue di fuoco si levano dall'interno di tutte le stanze e ti circondano. Non hai vie di scampo: è la fine!!!");
		scegliVai("Ricomincia", 1);
		break;
	case 11:
		immagine("zombie.png");
		testo("Il mostro con la sua forza sovrumana ti afferra e ti spezza il collo.");
		scegliVai("Ricomincia", 1);
		break;
	case 12:
		immagine("casa.png");
		testo("Apri la porta con la chiave e ti precipiti fuori. Dalle fiamme che avvolgono la casa provengono urla disumane. Dopo alcuni minuti è tutto finito. Sei riuscito ad uscirne vivo, ma la casa non è stata distrutta dalle fiamme, è ancora lí e ti aspetta...");
		break;
	case 13:
		immagine("casa.png");
		testo("Apri la porta con la chiave e ti precipiti fuori. Sei riuscito ad uscirne vivo, ma la maledizione non è finita e continuerà a mietere vittime...");
		scegliVai("Ricomincia", 1);
		break;
	}
	Vista.mostra();
}
