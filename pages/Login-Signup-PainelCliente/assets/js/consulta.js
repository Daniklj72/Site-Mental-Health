// consulta.js
$(document).ready(function() {
    
    // Date options selection
    $(".date-option").click(function() {
        $(".date-option").removeClass("selected");
        $(this).addClass("selected");
    });





    // Time options selection
    $(".time-option").click(function() {
        $(".time-option").removeClass("selected");
        $(this).addClass("selected");
    });

    // Set booking modal data
    $(".book-btn").click(function() {
        const professional = $(this).data("professional");
        const specialty = $(this).data("specialty");
        
        $("#modal-doctor-name").text(professional);
        $("#modal-doctor-specialty").text(specialty);
    });

    // Confirm booking
    $("#confirm-booking").click(function() {
        const professional = $("#modal-doctor-name").text();
        const specialty = $("#modal-doctor-specialty").text();
        const selectedDate = $(".date-option.selected");
        const selectedTime = $(".time-option.selected");
        
        const day = selectedDate.find(".day").text();
        const date = selectedDate.find(".date").text();
        const month = selectedDate.find(".month").text();
        const time = selectedTime.text();
        
        $("#conf-doctor-name").text(professional);
        $("#conf-date").text(`${day}, ${date} ${month}`);
        $("#conf-time").text(time);
        
        // Esconder a mensagem de "nenhuma consulta agendada"
        $(".no-appointments").hide();
        
        // Adicionar a nova consulta à lista com ícone de médico
        const newAppointment = `
        <div class="appointment-card">
            <div class="appointment-img" style="display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-user-md type-icon" style="color: #007bff; font-size: 40px;"></i>
            </div>
            <div class="appointment-info">
                <h4>${professional}</h4>
                <p>${specialty}</p>
                <div class="appointment-date">
                    <i class="far fa-calendar"></i> ${date} ${month}, 2025
                    <i class="far fa-clock ms-3"></i> ${time}
                </div>
            </div>
            <div class="appointment-actions">
                <button class="btn reschedule-btn" data-professional="${professional}" data-specialty="${specialty}">Reagendar</button>
                <button class="btn cancel-appointment-btn">Cancelar</button>
            </div>
        </div>
        `;
        
        $(".upcoming-appointments").append(newAppointment);
        
        $("#bookingModal").modal("hide");
        $("#confirmationModal").modal("show");
    });

    // Função para aplicar filtros
    function applyFilters() {
        const specialty = $("#specialty").val().toLowerCase();
        const availability = $("#availability").val();
        
        $(".professional-card").each(function() {
            const card = $(this);
            const professionalSpecialty = card.find(".specialty").text().toLowerCase();
            const professionalAvailability = card.find(".next-availability").text().toLowerCase();
            
            // Inicialmente definimos como visível
            let shouldShow = true;
            
            // Filtro de especialidade
            if (specialty && professionalSpecialty !== specialty) {
                shouldShow = false;
            }
            
            // Filtro de disponibilidade
            if (availability) {
                if (availability === "today" && !professionalAvailability.includes("hoje")) {
                    shouldShow = false;
                } else if (availability === "week" && !(
                    professionalAvailability.includes("hoje") || 
                    professionalAvailability.includes("amanhã") || 
                    professionalAvailability.includes("segunda") || 
                    professionalAvailability.includes("terça") || 
                    professionalAvailability.includes("quarta") || 
                    professionalAvailability.includes("quinta") || 
                    professionalAvailability.includes("sexta") || 
                    professionalAvailability.includes("sábado") || 
                    professionalAvailability.includes("domingo")
                )) {
                    shouldShow = false;
                }
            }
            
            // Exibir ou ocultar o cartão com base nos filtros
            if (shouldShow) {
                card.show();
            } else {
                card.hide();
            }
        });
    }

    // Filtrar profissionais por especialidade
    $("#specialty").change(function() {
        applyFilters();
    });

    // Filtrar profissionais por disponibilidade
    $("#availability").change(function() {
        applyFilters();
    });

    // Limpar todos os filtros
    $(".clear-filters").click(function() {
        $("#specialty").val('');
        $("#availability").val('');
        $(".professional-card").show();
    });
});