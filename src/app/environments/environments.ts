// para colocar variables de entorno

export const environment = {
    production: false,
    BASE_URL_KALUM_MANAGEMENT: 'http://localhost:5070/Kalum-management',

    // para el endpoint de usuario
    BASE_URL_KALUM_AUTH: 'http://localhost:5288/authkalummanagement',

    // anterior 
    // https://webhook.site/90c8acec-ffb5-437d-941b-4fc87a946d11

    // url para los roles de un usario
    // se maneja segun estandar de roles de C#
    BASE_URL_KALUM_ROLES: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
}