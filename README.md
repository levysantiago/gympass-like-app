# App

GymPass style app

# RF

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível ser possível se autenticar
- [x] Deve ser possível ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível ser possível o usuário buscar academias próximas
- [ ] Deve ser possível ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível ser possível validar o check-in de um usuário
- [x] Deve ser possível ser possível cadastrar uma academia

# RN

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [x] O usuário não pode fazer dois check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 mins após ser criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

# RNF

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por página
- [ ] O usuário deve ser identificado por um JWT
