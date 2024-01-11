# App

GymPass style app

# RF 

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível ser possível se autenticar
- [ ] Deve ser possível ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível ser possível o usuário buscar academias próximas
- [ ] Deve ser possível ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível ser possível validar o check-in de um usuário
- [ ] Deve ser possível ser possível cadastrar uma academia

# RN

- [ ] O usuário não deve poder se cadastrar com um email duplicado
- [ ] O usuário não pode fazer dois check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 mins após ser criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

# RNF

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por página
- [ ] O usuário deve ser identificado por um JWT