// Rate limiting simple en mémoire
// Stocke les tentatives d'envoi par IP
const rateLimitMap = new Map<string, number[]>();

// Configuration
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes en millisecondes
const MAX_REQUESTS = 3; // Maximum 3 messages par IP toutes les 10 minutes

/**
 * Vérifie si une IP a dépassé la limite de requêtes
 * @param ip Adresse IP du visiteur
 * @returns true si la limite est dépassée, false sinon
 */
export function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const requests = rateLimitMap.get(ip) || [];

    // Filtrer les requêtes dans la fenêtre de temps
    const recentRequests = requests.filter(
        timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );

    // Vérifier la limite
    if (recentRequests.length >= MAX_REQUESTS) {
        return true;
    }

    // Ajouter la nouvelle requête
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    return false;
}

/**
 * Nettoie les entrées expirées (optionnel, pour éviter la fuite mémoire)
 */
export function cleanupRateLimit() {
    const now = Date.now();
    for (const [ip, requests] of rateLimitMap.entries()) {
        const recentRequests = requests.filter(
            timestamp => now - timestamp < RATE_LIMIT_WINDOW
        );
        if (recentRequests.length === 0) {
            rateLimitMap.delete(ip);
        } else {
            rateLimitMap.set(ip, recentRequests);
        }
    }
}

// Nettoyage automatique toutes les 5 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupRateLimit, 5 * 60 * 1000);
}
