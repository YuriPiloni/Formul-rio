import express from 'express';

const app = express();
const porta = 4000;
const host = '0.0.0.0'; // ip refere-se a todas as interfaces (placas de redes) locais

//configurar nossa aplicação para receber os dados dos formulario
//voce pode escolher entre duas bibliotecas: QS ou QueryString. true escolhe QueryString e false QS.
app.use(express.urlencoded({ extended: true}));

var listaPaciente = []; // Lista para armazenar os pacientes cadastrados


//implementar a funcionalidade para entregar um formulário html para o cliente

function cadastroPacienteView(req, resp){
    resp.send(`
        <html>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <title>Cadastro</title>
            </head>
            <body class="d-flex justify-content-center align-items-center vh-100">
                <div class="container col-md-8 col-lg-6">
                    <h1>Cadastro de paciente</h1>
                    <form method="POST" action="/cadastroPaciente" class="row g-3 shadow p-4 rounded bg-light">
                    <div class="col-md-6">
                        <label for="nomePaciente" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nomePaciente" name="nomePaciente" placeholder="Nome do Paciente">
                    </div>
                    <div class="col-md-6">
                        <label for="sobrenomePaciente" class="form-label">Sobrenome</label>
                        <input type="text" class="form-control" id="sobrenomePaciente" name="sobrenomePaciente" placeholder="Sobrenome do Paciente">
                    </div>
                    <div class="col-md-4">
                        <label for="cpfPaciente" class="form-label">CPF</label>
                        <input type="text" class="form-control" id="cpfPaciente" name="cpfPaciente" placeholder="CPF do Paciente">
                    </div>
                    <div class="col-md-6">
                        <label for="cidadePaciente" class="form-label">Cidade</label>
                        <input type="text" class="form-control" id="cidadePaciente" name="cidadePaciente" placeholder="Cidade">
                    </div>
                    <div class="col-md-3">
                        <label for="estadoPaciente" class="form-label">Estado</label>
                        <select class="form-select" id="estadoPaciente" name="estadoPaciente">
                            <option selected disabled value="">Selecione...</option>
                            <option value="AC">Acre</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            <option value="EX">Estrangeiro</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="cepPaciente" class="form-label">CEP</label>
                        <input type="text" class="form-control" id="cepPaciente" name="cepPaciente" placeholder="CEP">
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar Paciente</button>
                    </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function menuView(req, resp) {
    resp.send(`
        <html>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <title>Menu da Clínica</title>
            </head>
            <body>
                <!-- Menu de Navegação -->
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Clínica Saúde</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/cadastroPaciente">Cadastrar Paciente</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Consultas</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Equipe Médica</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Sobre Nós</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Contato</a>
                                </li>
                            </ul>
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search">
                                <button class="btn btn-outline-light" type="submit">Pesquisar</button>
                            </form>
                        </div>
                    </div>
                </nav>

                <!-- Conteúdo principal -->
                <div class="container mt-5 text-center">
                    <h2 class="text-primary">Bem-vindo à Clínica Saúde!</h2>
                    <p>Escolha uma opção no menu para navegar.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function pacienteCadastrado(req, resp){
    //Recuperar os dados do formulario enviados para o servidor
    const nomePaciente = req.body.nomePaciente;
    const sobrenomePaciente = req.body.sobrenomePaciente;
    const cpfPaciente = req.body.cpfPaciente;
    const cidadePaciente = req.body.cidadePaciente;
    const estadoPaciente = req.body.estadoPaciente;
    const cepPaciente = req.body.cepPaciente;

    const paciente = {nomePaciente, sobrenomePaciente, cpfPaciente, cidadePaciente, estadoPaciente, cepPaciente};

    //Adiciona um novo paciente na lista a cada envio
    listaPaciente.push(paciente);

    //Mostrar a lista de Pacientes já cadastrados
    resp.write(`
            <html>
                <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <title>Lista de Pacientes Cadastrados</title>
                </head>
                <body>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Sobrenome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">Estado</th>
                                <th scope="col">CEP</th>
                            </tr>
                        </thead>
                    <tbody>`);
                    // Adicionar as listas da tabela

                    // Para cada paciente criar uma linha na tabela
                    for (var i=0; i<listaPaciente.length; i++){
                        resp.write(`<tr>
                                        <td>${listaPaciente[i].nomePaciente}</td>
                                        <td>${listaPaciente[i].sobrenomePaciente}</td>
                                        <td>${listaPaciente[i].cpfPaciente}</td>
                                        <td>${listaPaciente[i].cidadePaciente}</td>
                                        <td>${listaPaciente[i].estadoPaciente}</td>
                                        <td>${listaPaciente[i].cepPaciente}</td>
                                        
                                    </tr>`);
                    }
                    
    resp.write(`    </tbody>
                    </table>
                    <a class="btn btn-primary" href="/cadastroPaciente">Continuar Cadastrando</a>
                    <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
        `);
    
    resp.end(); //Sera enviada a resposta

    resp.send(`Paciente Cadastrado com sucesso!!`)
}

app.get('/cadastroPaciente', cadastroPacienteView); // Enviar formulario para cadastrar alunos
app.get('/', menuView); //Pagina do menu

//Metodo POST
app.post('/cadastroPaciente', pacienteCadastrado);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});