
// Dados dos profissionais
const profissionais = [
    {
        id: 1,
        nome: 'Dra. Ana Martins',
        especialidade: 'Psicologia',
        experiencia: '8 anos de experiência',
        avaliacao: 4.9,
        disponibilidade: 'Hoje',
        disponibilidadeTipo: 'hoje',
        cor: 'azul'
    },
    {
        id: 2,
        nome: 'Dr. Carlos Santos',
        especialidade: 'Fisioterapia',
        experiencia: '5 anos de experiência',
        avaliacao: 4.7,
        disponibilidade: 'Amanhã',
        disponibilidadeTipo: 'amanha',
        cor: 'verde'
    },
    {
        id: 3,
        nome: 'Dra. Lucia Oliveira',
        especialidade: 'Nutrição',
        experiencia: '6 anos de experiência',
        avaliacao: 4.8,
        disponibilidade: 'Esta Semana',
        disponibilidadeTipo: 'semana',
        cor: 'roxo'
    },
    {
        id: 4,
        nome: 'Dr. Roberto Lima',
        especialidade: 'Psicologia',
        experiencia: '10 anos de experiência',
        avaliacao: 4.9,
        disponibilidade: 'Hoje',
        disponibilidadeTipo: 'hoje',
        cor: 'azul'
    },
    {
        id: 5,
        nome: 'Dra. Patricia Costa',
        especialidade: 'Fisioterapia',
        experiencia: '7 anos de experiência',
        avaliacao: 4.6,
        disponibilidade: 'Esta Semana',
        disponibilidadeTipo: 'semana',
        cor: 'verde'
    },
    {
        id: 6,
        nome: 'Dr. Fernando Alves',
        especialidade: 'Nutrição',
        experiencia: '4 anos de experiência',
        avaliacao: 4.5,
        disponibilidade: 'Amanhã',
        disponibilidadeTipo: 'amanha',
        cor: 'roxo'
    }
];

// Dados das consultas
let consultas = [
    { 
        id: 1, 
        profissional: 'Dra. Ana Martins', 
        especialidade: 'Psicologia', 
        data: '2025-05-12', 
        horario: '14:00', 
        tipo: 'Online', 
        status: 'Agendada' 
    },
    { 
        id: 2, 
        profissional: 'Dr. Carlos Santos', 
        especialidade: 'Fisioterapia', 
        data: '2025-05-15', 
        horario: '10:30', 
        tipo: 'Presencial', 
        status: 'Confirmado' 
    },
    { 
        id: 3, 
        profissional: 'Dra. Maria Silva', 
        especialidade: 'Nutrição', 
        data: '2025-05-18', 
        horario: '09:00', 
        tipo: 'Online', 
        status: 'Agendada' 
    }
];

// Variáveis de controle
let consultasSelecionadas = [];
let selecionarTodas = false;
let profissionalSelecionado = { nome: '', especialidade: '' };
let dataSelecionada = '12';
let horarioSelecionado = '14:00';
let tipoConsultaSelecionado = 'online';
let filtroEspecialidade = '';
let filtroDisponibilidade = '';
let profissionaisFiltrados = [...profissionais];

// Função para renderizar profissionais
function renderizarProfissionais() {
    const container = document.getElementById('containerProfissionais');
    const nenhumProfissional = document.getElementById('nenhumProfissional');
    
    if (profissionaisFiltrados.length === 0) {
        container.style.display = 'none';
        nenhumProfissional.style.display = 'block';
        return;
    }
    
    container.style.display = 'flex';
    nenhumProfissional.style.display = 'none';
    
    let html = '';
    
    profissionaisFiltrados.forEach(profissional => {
        const corClasse = profissional.cor === 'azul' ? '' : 
                         profissional.cor === 'verde' ? 'imagem-profissional-verde' : 
                         'imagem-profissional-roxo';
        
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card-profissional">
                    <div class="imagem-profissional ${corClasse}">
                        <div class="placeholder-profissional">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <div class="avaliacao">
                            <i class="fas fa-star"></i>${profissional.avaliacao}
                        </div>
                    </div>
                    <div class="informacoes-profissional">
                        <h4 class="fw-bold mb-1">${profissional.nome}</h4>
                        <p class="especialidade mb-3">${profissional.especialidade}</p>
                        <p class="experiencia mb-3">
                            <i class="fas fa-briefcase me-2"></i>${profissional.experiencia}
                        </p>
                        <div class="proxima-disponibilidade mb-4">
                            <i class="far fa-clock me-2"></i>Próx. disponível: ${profissional.disponibilidade}
                        </div>
                        <button class="botao-agendar" onclick="abrirModalAgendamento('${profissional.nome}', '${profissional.especialidade}')">
                            Marcar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Função para aplicar filtros
function aplicarFiltros() {
    profissionaisFiltrados = profissionais.filter(profissional => {
        const passaEspecialidade = !filtroEspecialidade || profissional.especialidade === filtroEspecialidade;
        
        let passaDisponibilidade = true;
        if (filtroDisponibilidade === 'hoje') {
            passaDisponibilidade = profissional.disponibilidadeTipo === 'hoje';
        } else if (filtroDisponibilidade === 'semana') {
            passaDisponibilidade = ['hoje', 'amanha', 'semana'].includes(profissional.disponibilidadeTipo);
        }
        
        return passaEspecialidade && passaDisponibilidade;
    });
    
    renderizarProfissionais();
}

// Função para limpar filtros
function limparFiltros() {
    filtroEspecialidade = '';
    filtroDisponibilidade = '';
    document.getElementById('filtroEspecialidade').value = '';
    document.getElementById('filtroDisponibilidade').value = '';
    aplicarFiltros();
}

// Função para abrir modal de agendamento
function abrirModalAgendamento(profissional, especialidade) {
    profissionalSelecionado = { nome: profissional, especialidade: especialidade };
    document.getElementById('nomeProfissionalModal').textContent = profissional;
    document.getElementById('especialidadeProfissionalModal').textContent = especialidade;
    
    const modal = new bootstrap.Modal(document.getElementById('modalAgendamento'));
    modal.show();
}

// Função para confirmar agendamento
function confirmarAgendamento() {
    // Pegar o tipo de consulta selecionado no modal
    const selectTipoConsulta = document.getElementById('tipoConsulta');
    const tipoConsultaTexto = selectTipoConsulta.value === 'online' ? 'Online' : 'Presencial';
    
    const novaConsulta = {
        id: Date.now(), 
        profissional: profissionalSelecionado.nome,
        especialidade: profissionalSelecionado.especialidade,
        data: '2025-05-25',
        horario: horarioSelecionado,
        tipo: tipoConsultaTexto,
        status: 'Agendada'
    };

    consultas.push(novaConsulta);
    renderizarConsultas();
    
    const modalAgendamento = bootstrap.Modal.getInstance(document.getElementById('modalAgendamento'));
    modalAgendamento.hide();
    
    document.getElementById('nomeProfissionalConfirmacao').textContent = profissionalSelecionado.nome;
    document.getElementById('dataConfirmacao').textContent = dataSelecionada;
    document.getElementById('horarioConfirmacao').textContent = horarioSelecionado;
    document.getElementById('tipoConsultaConfirmacao').textContent = tipoConsultaTexto;
    
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
    modalConfirmacao.show();
    
    mostrarNotificacao('Consulta agendada com sucesso!', 'success');
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem, tipo) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${tipo === 'success' ? 'success' : 'danger'} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.textContent = mensagem;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Função para formatar data
function formatarData(data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}

// Função para renderizar consultas
function renderizarConsultas() {
    const corpoTabela = document.getElementById('corpoTabelaConsultas');
    const containerConsultas = document.getElementById('container-consultas');
    const nenhumaConsulta = document.getElementById('nenhumaConsulta');
    
    if (consultas.length === 0) {
        containerConsultas.style.display = 'none';
        nenhumaConsulta.style.display = 'block';
        return;
    }
    
    containerConsultas.style.display = 'block';
    nenhumaConsulta.style.display = 'none';
    
    let html = '';
    
    consultas.forEach(consulta => {
        const classeStatus = consulta.status === 'Confirmado' ? 'status-confirmado' : 'status-agendada';
        
        html += `
            <tr>
                <td>
                    <input type="checkbox" 
                           class="form-check-input checkbox-consulta" 
                           data-id="${consulta.id}">
                </td>
                <td>
                    <div>
                        <div class="fw-semibold text-dark">${consulta.profissional}</div>
                        <div class="small text-danger">${consulta.especialidade}</div>
                        <div class="small text-muted">${consulta.tipo}</div>
                    </div>
                </td>
                <td>
                    <div class="small">
                        <div class="d-flex align-items-center mb-1">
                            <i class="far fa-calendar text-muted me-2"></i>
                            ${formatarData(consulta.data)}
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="far fa-clock text-muted me-2"></i>
                            ${consulta.horario}
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge-status ${classeStatus}">
                        ${consulta.status}
                    </span>
                </td>
                <td>
                    <button class="botao-cancelar" 
                            onclick="excluirConsulta(${consulta.id})" 
                            title="Cancelar consulta">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    corpoTabela.innerHTML = html;
    atualizarCheckboxSelecionarTodas();
}

// Função para excluir consulta
function excluirConsulta(id) {
    consultas = consultas.filter(consulta => consulta.id !== id);
    consultasSelecionadas = consultasSelecionadas.filter(consultaId => consultaId !== id);
    renderizarConsultas();
    mostrarNotificacao('Consulta cancelada com sucesso!', 'success');
}

// Função para excluir consultas selecionadas
function excluirConsultasSelecionadas() {
    if (consultasSelecionadas.length === 0) {
        mostrarNotificacao('Nenhuma consulta selecionada!', 'error');
        return;
    }
    
    const contador = consultasSelecionadas.length;
    consultas = consultas.filter(consulta => !consultasSelecionadas.includes(consulta.id));
    consultasSelecionadas = [];
    selecionarTodas = false;
    renderizarConsultas();
    mostrarNotificacao(`${contador} consulta(s) cancelada(s) com sucesso!`, 'success');
}

// Função para manipular mudança de checkbox
function manipularMudancaCheckbox(id) {
    if (consultasSelecionadas.includes(id)) {
        consultasSelecionadas = consultasSelecionadas.filter(consultaId => consultaId !== id);
    } else {
        consultasSelecionadas.push(id);
    }
    atualizarCheckboxSelecionarTodas();
}

// Função para manipular selecionar todas
function manipularSelecionarTodas() {
    const checkboxSelecionarTodas = document.getElementById('selecionarTodas');
    selecionarTodas = checkboxSelecionarTodas.checked;
    
    if (selecionarTodas) {
        consultasSelecionadas = consultas.map(consulta => consulta.id);
    } else {
        consultasSelecionadas = [];
    }
    
    document.querySelectorAll('.checkbox-consulta').forEach(checkbox => {
        checkbox.checked = selecionarTodas;
    });
}

// Função para atualizar checkbox selecionar todas
function atualizarCheckboxSelecionarTodas() {
    const checkboxSelecionarTodas = document.getElementById('selecionarTodas');
    selecionarTodas = consultasSelecionadas.length === consultas.length && consultas.length > 0;
    checkboxSelecionarTodas.checked = selecionarTodas;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar componentes iniciais
    renderizarConsultas();
    renderizarProfissionais();
    
    // Event listeners para filtros
    document.getElementById('filtroEspecialidade').addEventListener('change', function(e) {
        filtroEspecialidade = e.target.value;
        aplicarFiltros();
    });
    
    document.getElementById('filtroDisponibilidade').addEventListener('change', function(e) {
        filtroDisponibilidade = e.target.value;
        aplicarFiltros();
    });
    
    document.getElementById('limparFiltros').addEventListener('click', limparFiltros);
    
    // Event listeners para consultas
    document.getElementById('selecionarTodas').addEventListener('change', manipularSelecionarTodas);
    document.getElementById('excluirSelecionadas').addEventListener('click', excluirConsultasSelecionadas);
    
    document.getElementById('corpoTabelaConsultas').addEventListener('change', function(e) {
        if (e.target.classList.contains('checkbox-consulta')) {
            manipularMudancaCheckbox(parseInt(e.target.dataset.id));
        }
    });
    
    // Event listeners para modal
    document.querySelectorAll('.opcao-data').forEach(opcao => {
        opcao.addEventListener('click', function() {
            document.querySelectorAll('.opcao-data').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            dataSelecionada = this.dataset.data;
        });
    });
    
    document.querySelectorAll('.opcao-horario').forEach(opcao => {
        opcao.addEventListener('click', function() {
            document.querySelectorAll('.opcao-horario').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            horarioSelecionado = this.dataset.horario;
        });
    });
    
    // Event listener para tipo de consulta
    document.getElementById('tipoConsulta').addEventListener('change', function(e) {
        tipoConsultaSelecionado = e.target.value;
    });
});

// Expor funções globalmente para onclick
window.abrirModalAgendamento = abrirModalAgendamento;
window.confirmarAgendamento = confirmarAgendamento;
window.excluirConsulta = excluirConsulta;