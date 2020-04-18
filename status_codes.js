module.exports = {
    
    /*==============================================================[ 1xx - Information ]==============================================================*/
    information: {
        Continue: 100,              // Attente de la suite de la requête.
        switchingProtocols: 101, 	// 	Acceptation du changement de protocole.
        Processing: 102, 	        // 	WebDAV RFC 25183,4: Traitement en cours (évite que le client dépasse le temps d’attente limite).
        earlyHints: 103 	        // 	RFC 82975 : (Expérimental) Dans l'attente de la réponse définitive, le serveur retourne des liens que le client peut commencer à télécharger.
    },

    /*=================================================================[ 2xx - Succès ]=================================================================*/
    success: {
        ok: 200, 	                // 	Requête traitée avec succès. La réponse dépendra de la méthode de requête utilisée.
        created: 201, 	            // 	Requête traitée avec succès et création d’un document.
        ccepted: 202, 	            // 	Requête traitée, mais sans garantie de résultat.
        nonAuthoritative: 203, 	    //  Information 	Information retournée, mais générée par une source non certifiée.
        noContent: 204, 	        // 	Requête traitée avec succès mais pas d’information à renvoyer.
        resetContent: 205, 	        // 	Requête traitée avec succès, la page courante peut être effacée.
        partialContent: 206, 	    // 	Une partie seulement de la ressource a été transmise.
        multiStatus: 207, 	 	    //  WebDAV : Réponse multiple.
        alreadyReported: 208, 	 	//  WebDAV : Le document a été envoyé précédemment dans cette collection.
        contentDifferent: 210, 	    // 	WebDAV : La copie de la ressource côté client diffère de celle du serveur (contenu ou propriétés).
        IMUsed: 226 	            // 	RFC 32296 : Le serveur a accompli la requête pour la ressource, et la réponse est une représentation du résultat d'une ou plusieurs manipulations d'instances appliquées à l'instance actuelle.
    },

    /*=================================================================[ 3xx - Redirection ]=================================================================*/
    redirection: {
        multipleChoices: 300, 	    // 	L’URI demandée se rapporte à plusieurs ressources.
        movedPermanently: 301, 	    // 	Document déplacé de façon permanente.
        found: 302, 	            // 	Document déplacé de façon temporaire.
        seeOther: 303, 	            // 	La réponse à cette requête est ailleurs.
        notModified: 304, 	        // 	Document non modifié depuis la dernière requête.
        useProxy: 305, 	            //  (depuis HTTP/1.1) 	La requête doit être ré-adressée au proxy.
        switchProxy: 306, 	        // 	Code utilisé par une ancienne version de la RFC 26167, à présent réservé. Elle signifiait « Les requêtes suivantes doivent utiliser le proxy spécifié »8.
        temporaryRedirect: 307,     //	La requête doit être redirigée temporairement vers l’URI spécifiée.
        permanentRedirect: 308, 	// 	La requête doit être redirigée définitivement vers l’URI spécifiée.
        tooManyRedirects: 310, 	 	//  La requête doit être redirigée de trop nombreuses fois, ou est victime d’une boucle de redirection.
    },
    
    /*=================================================================[ 4xx - Erreur du client web ]=================================================================*/    
    clientError: {
        badRequest: 400, 	                    // 	La syntaxe de la requête est erronée.
        unauthorized: 401, 	                    // 	Une authentification est nécessaire pour accéder à la ressource.
        paymentRequired: 402, 	                // 	Paiement requis pour accéder à la ressource.
        forbidden: 403, 	                    // 	Le serveur a compris la requête, mais refuse de l'exécuter. Contrairement à l'erreur 401, s'authentifier ne fera aucune différence. Sur les serveurs où l'authentification est requise, cela signifie généralement que l'authentification a été acceptée mais que les droits d'accès ne permettent pas au client d'accéder à la ressource.
        notFound: 404, 	 	                    //  Ressource non trouvée.
        methodNotAllowed: 405, 	                // 	Méthode de requête non autorisée.
        notAcceptable: 406,                     // 	La ressource demandée n'est pas disponible dans un format qui respecterait les en-têtes « Accept » de la requête.
        proxyAuthenticationRequired: 407,       // 	Accès à la ressource autorisé par identification avec le proxy.
        requestTimeout: 408, 	                // 	Temps d’attente d’une requête du client, écoulé côté serveur. D'après les spécifications HTTP : « Le client n'a pas produit de requête dans le délai que le serveur était prêt à attendre. Le client PEUT répéter la demande sans modifications à tout moment ultérieur »9.
        conflict: 409, 	                        // 	La requête ne peut être traitée en l’état actuel.
        gone: 410, 	                            // 	La ressource n'est plus disponible et aucune adresse de redirection n’est connue.
        lengthRequired: 411, 	                // 	La longueur de la requête n’a pas été précisée.
        preconditionFailed: 412,    	        // 	Préconditions envoyées par la requête non vérifiées.
        requestEntityTooLarge: 413, 	        //  Traitement abandonné dû à une requête trop importante.
        requestURITooLong: 414,     	        // 	URI trop longue.
        unsupportedMediaType: 415, 	 	        // Format de requête non supporté pour une méthode et une ressource données.
        requestedRangeUnsatisfiable: 416,       //  Champs d’en-tête de requête « range » incorrect.
        expectationFailed: 417,                 // Comportement attendu et défini dans l’en-tête de la requête insatisfaisante.
        imATeapot: 418, 	                    // 	« Je suis une théière » : Ce code est défini dans la RFC 232410 datée du 1er avril 1998, Hyper Text Coffee Pot Control Protocol.
        badMapping: 421, 	                    // 	La requête a été envoyée à un serveur qui n'est pas capable de produire une réponse (par exemple, car une connexion a été réutilisée).
        misdirectedRequest: 421,                //  idem "badMapping"
        unprocessableEntity: 422, 	            // 	WebDAV : L’entité fournie avec la requête est incompréhensible ou incomplète.
        locked: 423,                 	        // 	WebDAV : L’opération ne peut avoir lieu car la ressource est verrouillée.
        methodFailure: 424, 	                // 	WebDAV : Une méthode de la transaction a échoué.
        unorderedCollection: 425, 	            // 	WebDAV RFC 364811 : Ce code est défini dans le brouillon WebDAV Advanced Collections Protocol, mais est absent de Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol.
        upgradeRequired: 426, 	                // 	RFC 281712 : Le client devrait changer de protocole, par exemple au profit de TLS/1.0.
        preconditionRequired: 428, 	 	        // RFC 658513 : La requête doit être conditionnelle.
        tooManyRequests: 429, 	                // 	RFC 658514 : Le client a émis trop de requêtes dans un délai donné.
        requestHeaderFieldsTooLarge: 431,       // 	RFC 658514 : Les entêtes HTTP émises dépassent la taille maximale admise par le serveur.
        retryWith: 449,              	        // 	Code défini par Microsoft. La requête devrait être renvoyée après avoir effectué une action.
        blockedByWindowsParentalControls: 450,  // 	Code défini par Microsoft. Cette erreur est produite lorsque les outils de contrôle parental de Windows sont activés et bloquent l’accès à la page.
        unavailableForLegalReasons: 451, 	    // 	Ce code d'erreur indique que la ressource demandée est inaccessible pour des raisons d'ordre légal15,16.
        unrecoverableError: 456 	            // 	WebDAV : Erreur irrécupérable.
    },
        /*=================================================================[ 5xx - Erreur du serveur / du serveur d'application ]=================================================================*/    

    serverError: {
        internalServerError: 500,    	        // 	Erreur interne du serveur.
        notImplemented: 501, 	 	            //  Fonctionnalité réclamée non supportée par le serveur.
        badGateway: 502, 	                    // 	En agissant en tant que serveur proxy ou passerelle, le serveur a reçu une réponse invalide depuis le serveur distant.
        proxyError: 502,                        //  idem badGateway
        serviceUnavailable: 503,     	        // 	Service temporairement indisponible ou en maintenance.
        gatewayTimeout: 504, 	                // 	Temps d’attente d’une réponse d’un serveur à un serveur intermédiaire écoulé.
        HTTPVersionNotSupported: 505, 	        // 	Version HTTP non gérée par le serveur.
        variantAlsoNegotiates: 506, 	        // 	RFC 229518 : Erreur de négociation. Transparent content negociation.
        insufficientStorage: 507, 	            // 	WebDAV : Espace insuffisant pour modifier les propriétés ou construire la collection.
        loopDetected: 508, 	                    // 	WebDAV : Boucle dans une mise en relation de ressources (RFC 584219).
        bandwidthLimitExceeded: 509, 	        // 	Utilisé par de nombreux serveurs pour indiquer un dépassement de quota.
        notExtended: 510,            	        // 	RFC 277420 : La requête ne respecte pas la politique d'accès aux ressources HTTP étendues.
        networkAuthenticationRequired: 511 	    // 	RFC 658514 : Le client doit s'authentifier pour accéder au réseau. Utilisé par les portails captifs pour rediriger les clients vers la page d'authentification. 
    }
}