const profissionais = [
    {
        id: 1,
        nome: 'Dra. Ana Silva',
        especialidade: 'Psicologia',
        experiencia: '15 anos de experiência',
        avaliacao: 4.8,
        disponibilidade: 'Hoje',
        disponibilidadeTipo: 'hoje',
        cor: 'azul',
        foto: '/img-medicos/1.png'
    },
    {
        id: 2,
        nome: 'Dr. Carlos Santos',
        especialidade: 'Psiquiatra',
        experiencia: '12 anos de experiência',
        avaliacao: 4.9,
        disponibilidade: 'Amanhã',
        disponibilidadeTipo: 'amanha',
        cor: 'verde',
        foto: '/img-medicos/2.png'
    },
    {
        id: 3,
        nome: 'Dra. Mariana Costa',
        especialidade: 'Terapeuta',
        experiencia: '10 anos de experiência',
        avaliacao: 4.7,
        disponibilidade: 'Esta Semana',
        disponibilidadeTipo: 'semana',
        cor: 'roxo',
        foto: '/img-medicos/3.png'
    },
    {
        id: 4,
        nome: 'Dr. Pedro Oliveira',
        especialidade: 'Psicologia',
        experiencia: '8 anos de experiência',
        avaliacao: 4.9,
        disponibilidade: 'Hoje',
        disponibilidadeTipo: 'hoje',
        cor: 'azul',
        foto: '/img-medicos/4.png'
    },
    {
        id: 5,
        nome: 'Dra. Juliana Lima',
        especialidade: 'Psiquiatra',
        experiencia: '11 anos de experiência',
        avaliacao: 4.8,
        disponibilidade: 'Esta Semana',
        disponibilidadeTipo: 'semana',
        cor: 'verde',
        foto: '/img-medicos/6.png'
    },
    {
        id: 6,
        nome: 'Dr. Rafael Souza',
        especialidade: 'Terapeuta',
        experiencia: '9 anos de experiência',
        avaliacao: 4.7,
        disponibilidade: 'Amanhã',
        disponibilidadeTipo: 'amanha',
        cor: 'roxo',
        foto: '/img-medicos/5.png'
    }
];

// Corrigindo as consultas para corresponder aos profissionais
let consultas = [
    { 
        id: 1, 
        profissional: 'Dra. Ana Silva', 
        especialidade: 'Psicologia', 
        data: '2025-05-12', 
        horario: '14:00', 
        tipo: 'Online', 
        status: 'Agendada' 
    },
    { 
        id: 2, 
        profissional: 'Dr. Carlos Santos', 
        especialidade: 'Psiquiatra', 
        data: '2025-05-15', 
        horario: '10:30', 
        tipo: 'Presencial', 
        status: 'Confirmado' 
    },
    { 
        id: 3, 
        profissional: 'Dra. Mariana Costa', 
        especialidade: 'Terapeuta', 
        data: '2025-05-18', 
        horario: '09:00', 
        tipo: 'Online', 
        status: 'Agendada' 
    }
];

let consultasSelecionadas = [];
let profissionalSelecionado = { nome: '', especialidade: '' };
let dataSelecionada = '12';
let horarioSelecionado = '14:00';

function renderizarProfissionais() {
    const container = document.getElementById('containerProfissionais');
    const nenhumProfissional = document.getElementById('nenhumProfissional');
    
    // Aplicar filtros
    const filtroEspec = document.getElementById('filtroEspecialidade').value;
    const filtroDisp = document.getElementById('filtroDisponibilidade').value;
    
    const profissionaisFiltrados = profissionais.filter(profissional => {
        const passaEspecialidade = !filtroEspec || profissional.especialidade === filtroEspec;
        
        let passaDisponibilidade = true;
        if (filtroDisp === 'hoje') {
            passaDisponibilidade = profissional.disponibilidadeTipo === 'hoje';
        } else if (filtroDisp === 'semana') {
            passaDisponibilidade = ['hoje', 'amanha', 'semana'].includes(profissional.disponibilidadeTipo);
        }
        
        return passaEspecialidade && passaDisponibilidade;
    });
    
    if (profissionaisFiltrados.length === 0) {
        container.classList.add('hidden');
        nenhumProfissional.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    nenhumProfissional.classList.add('hidden');
    
    let html = '';
    
    profissionaisFiltrados.forEach(profissional => {
        const corClasse = profissional.cor === 'verde' ? 'imagem-verde' : 
                         profissional.cor === 'roxo' ? 'imagem-roxo' : 'imagem-azul';
        
        html += `
            <div class="card-profissional bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="h-48 ${corClasse} flex items-center justify-center relative">
                    ${profissional.foto ? 
                        `<img src="${profissional.foto}" alt="${profissional.nome}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="text-white text-6xl hidden">
                             <i class="fas fa-user-md"></i>
                         </div>` :
                        `<div class="text-white text-6xl">
                             <i class="fas fa-user-md"></i>
                         </div>`
                    }
                    <div class="absolute bottom-3 right-3 bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                        ★ ${profissional.avaliacao}
                    </div>
                </div>
                
                <div class="p-6">
                    <h4 class="text-xl font-bold mb-1">${profissional.nome}</h4>
                    <p class="text-blue-500 font-semibold text-sm mb-3">${profissional.especialidade}</p>
                    <p class="text-gray-600 text-sm mb-3">
                        <i class="fas fa-briefcase mr-2"></i>${profissional.experiencia}
                    </p>
                    <div class="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm mb-4 inline-block">
                        <i class="fas fa-clock mr-2"></i>Próx. disponível: ${profissional.disponibilidade}
                    </div>
                    <button onclick="abrirModalAgendamento('${profissional.nome}', '${profissional.especialidade}')" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                        Marcar
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function formatarData(data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}

function renderizarConsultas() {
    const corpoTabela = document.getElementById('corpoTabelaConsultas');
    const containerConsultas = document.getElementById('container-consultas');
    const nenhumaConsulta = document.getElementById('nenhumaConsulta');
    
    if (consultas.length === 0) {
        containerConsultas.classList.add('hidden');
        nenhumaConsulta.classList.remove('hidden');
        return;
    }
    
    containerConsultas.classList.remove('hidden');
    nenhumaConsulta.classList.add('hidden');
    
    let html = '';
    
    consultas.forEach(consulta => {
        const classeStatus = consulta.status === 'Confirmado' ? 
            'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800';
        
        html += `
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-4 px-4">
                    <input type="checkbox" class="checkbox-consulta" data-id="${consulta.id}">
                </td>
                <td class="py-4 px-4">
                    <div>
                        <div class="font-semibold text-gray-800">${consulta.profissional}</div>
                        <div class="text-sm text-blue-500">${consulta.especialidade}</div>
                        <div class="text-sm text-gray-500">${consulta.tipo}</div>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <div class="text-sm">
                        <div class="flex items-center mb-1">
                            <i class="fas fa-calendar text-gray-400 mr-2"></i>
                            ${formatarData(consulta.data)}
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock text-gray-400 mr-2"></i>
                            ${consulta.horario}
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${classeStatus}">
                        ${consulta.status}
                    </span>
                </td>
                <td class="py-4 px-4">
                    <button onclick="excluirConsulta(${consulta.id})" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Cancelar consulta">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    corpoTabela.innerHTML = html;
}

function abrirModalAgendamento(nome, especialidade) {
    profissionalSelecionado = { nome, especialidade };
    document.getElementById('nomeProfissionalModal').textContent = nome;
    document.getElementById('especialidadeProfissionalModal').textContent = especialidade;
    document.getElementById('modalAgendamento').classList.add('show');
}

function fecharModalAgendamento() {
    document.getElementById('modalAgendamento').classList.remove('show');
}

function confirmarAgendamento() {
    const tipoConsulta = document.getElementById('tipoConsulta').value;
    
    const novaConsulta = {
        id: Date.now(),
        profissional: profissionalSelecionado.nome,
        especialidade: profissionalSelecionado.especialidade,
        data: '2025-05-25',
        horario: horarioSelecionado,
        tipo: tipoConsulta,
        status: 'Agendada'
    };

    consultas.push(novaConsulta);
    renderizarConsultas();
    
    fecharModalAgendamento();
    
    document.getElementById('nomeProfissionalConfirmacao').textContent = profissionalSelecionado.nome;
    document.getElementById('dataConfirmacao').textContent = dataSelecionada;
    document.getElementById('horarioConfirmacao').textContent = horarioSelecionado;
    document.getElementById('tipoConsultaConfirmacao').textContent = tipoConsulta;
    
    document.getElementById('modalConfirmacao').classList.add('show');
}

function fecharModalConfirmacao() {
    document.getElementById('modalConfirmacao').classList.remove('show');
}

function excluirConsulta(id) {
    consultas = consultas.filter(consulta => consulta.id !== id);
    consultasSelecionadas = consultasSelecionadas.filter(consultaId => consultaId !== id);
    renderizarConsultas();
}

function excluirConsultasSelecionadas() {
    if (consultasSelecionadas.length === 0) {
        alert('Nenhuma consulta selecionada!');
        return;
    }
    
    consultas = consultas.filter(consulta => !consultasSelecionadas.includes(consulta.id));
    consultasSelecionadas = [];
    renderizarConsultas();
    document.getElementById('selecionarTodas').checked = false;
}

function limparFiltros() {
    document.getElementById('filtroEspecialidade').value = '';
    document.getElementById('filtroDisponibilidade').value = '';
    renderizarProfissionais();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    renderizarConsultas();
    renderizarProfissionais();
    
    // Filtros
    document.getElementById('filtroEspecialidade').addEventListener('change', renderizarProfissionais);
    document.getElementById('filtroDisponibilidade').addEventListener('change', renderizarProfissionais);
    document.getElementById('limparFiltros').addEventListener('click', limparFiltros);
    
    // Consultas
    document.getElementById('selecionarTodas').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.checkbox-consulta');
        consultasSelecionadas = [];
        
        if (this.checked) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                consultasSelecionadas.push(parseInt(checkbox.dataset.id));
            });
        } else {
            checkboxes.forEach(checkbox => checkbox.checked = false);
        }
    });
    
    document.getElementById('excluirSelecionadas').addEventListener('click', excluirConsultasSelecionadas);
    
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('checkbox-consulta')) {
            const id = parseInt(e.target.dataset.id);
            if (e.target.checked) {
                if (!consultasSelecionadas.includes(id)) {
                    consultasSelecionadas.push(id);
                }
            } else {
                consultasSelecionadas = consultasSelecionadas.filter(consultaId => consultaId !== id);
            }
            
            // Atualizar checkbox "selecionar todas"
            const allCheckboxes = document.querySelectorAll('.checkbox-consulta');
            const checkedCheckboxes = document.querySelectorAll('.checkbox-consulta:checked');
            document.getElementById('selecionarTodas').checked = allCheckboxes.length === checkedCheckboxes.length && allCheckboxes.length > 0;
        }
    });
    
    // Modal - Seleção de data
    document.addEventListener('click', function(e) {
        if (e.target.closest('.opcao-data')) {
            document.querySelectorAll('.opcao-data').forEach(opt => opt.classList.remove('selected'));
            e.target.closest('.opcao-data').classList.add('selected');
            dataSelecionada = e.target.closest('.opcao-data').dataset.data;
        }
        
        if (e.target.closest('.opcao-horario')) {
            document.querySelectorAll('.opcao-horario').forEach(opt => opt.classList.remove('selected'));
            e.target.closest('.opcao-horario').classList.add('selected');
            horarioSelecionado = e.target.closest('.opcao-horario').dataset.horario;
        }
    });
    
    // Fechar modal clicando fora
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
});