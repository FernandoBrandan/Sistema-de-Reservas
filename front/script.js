
 
        const API = 'http://localhost/api'

        // Elementos
        const els = {
            loadResources: document.getElementById('loadResources'),
            createResource: document.getElementById('createResource'),
            createResourceForm: document.getElementById('createResourceForm'),
            submitResource: document.getElementById('submitResource'),
            resourceName: document.getElementById('resourceName'),
            resourceType: document.getElementById('resourceType'),
            resourceCapacity: document.getElementById('resourceCapacity'),
            loadUsers: document.getElementById('loadUsers'),
            createUser: document.getElementById('createUser'),
            checkAvailability: document.getElementById('checkAvailability'),
            createReservation: document.getElementById('createReservation'),
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            getReservation: document.getElementById('getReservation'),
            cancelReservation: document.getElementById('cancelReservation'),
            loadCalendar: document.getElementById('loadCalendar'),
            loadOccupancyReport: document.getElementById('loadOccupancyReport'),
            loadFailedTransactions: document.getElementById('loadFailedTransactions'),
            checkTransactionStatus: document.getElementById('checkTransactionStatus'),
            checkTransactionEvents: document.getElementById('checkTransactionEvents'),
            retryTransaction: document.getElementById('retryTransaction'),

            resourceSelect: document.getElementById('resourceSelect'),
            reserveResourceSelect: document.getElementById('reserveResourceSelect'),
            dateInput: document.getElementById('dateInput'),
            userIdInput: document.getElementById('userIdInput'),
            startTimeInput: document.getElementById('startTimeInput'),
            endTimeInput: document.getElementById('endTimeInput'),
            reservationIdInput: document.getElementById('reservationIdInput'),
            correlationIdInput: document.getElementById('correlationIdInput')
        }

        // Fecha actual
        els.dateInput.value = new Date().toISOString().split('T')[0]

        // Helpers
        function show(el, type, msg) {
            el.innerHTML = `<div class="result ${type}">${msg}</div>`
        }

        function loading(el) { show(el, 'loading', 'Cargando...') }
        function error(el, msg) { show(el, 'error', '❌ ' + msg) }
        function success(el, msg) { show(el, 'success', '✅ ' + msg) }

        async function api(url, options = {}) {
            try {
                const res = await fetch(url, {
                    headers: { 'Content-Type': 'application/json', ...options.headers },
                    ...options
                })
                if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
                return res.headers.get('content-type')?.includes('json') ? await res.json() : await res.text()
            } catch (e) {
                if (e.name === 'TypeError') throw new Error('No se puede conectar con el servidor')
                throw e
            }
        }

        function updateSelects(resources) {
            const options = resources.map(r => `<option value="${r.id}">${r.name}</option>`).join('')
            els.resourceSelect.innerHTML = '<option value="">Seleccionar</option>' + options
            els.reserveResourceSelect.innerHTML = '<option value="">Seleccionar</option>' + options
        }

        function statusBadge(status) {
            const map = {
                'CONFIRMED': 'confirmed', 'PENDING': 'pending', 'CANCELLED': 'cancelled'
            }
            return `<span class="status ${map[status] || 'pending'}">${status}</span>`
        }

        // Recursos
        els.loadResources.onclick = async () => {
            const result = document.getElementById('resourcesResult')
            loading(result)
            try {
                const data = await api(`${API}/resources`)
                if (data?.length) {
                    updateSelects(data)
                    const html = data.map(r => `
        <div class="data-item">
          <strong>${r.name}</strong><br>
          Tipo: ${r.type || 'N/A'}<br>
          Capacidad: ${r.capacity || 'N/A'}<br>
          ID: ${r.id}
        </div>
      `).join('')
                    result.innerHTML = html
                } else {
                    error(result, 'No hay recursos')
                }
            } catch (e) {
                error(result, e.message)
            }
        }

        els.createResource.onclick = () => {
            const form = els.createResourceForm
            form.style.display = form.style.display === 'none' ? 'block' : 'none'
        }

        els.submitResource.onclick = async () => {
            const result = document.getElementById('resourcesResult')
            const data = {
                name: els.resourceName.value,
                type: els.resourceType.value,
                capacity: parseInt(els.resourceCapacity.value) || 0
            }
            if (!data.name) return error(result, 'Nombre requerido')

            loading(result)
            try {
                await api(`${API}/resources`, { method: 'POST', body: JSON.stringify(data) })
                success(result, 'Recurso creado')
                els.createResourceForm.style.display = 'none'
                els.resourceName.value = els.resourceType.value = els.resourceCapacity.value = ''
                els.loadResources.click()
            } catch (e) {
                error(result, e.message)
            }
        }

        // Usuarios
        const loadUsersBtn = document.getElementById('loadUsers')
        const createUserToggleBtn = document.getElementById('createUserToggle')
        const createUserFormDiv = document.getElementById('createUserForm')
        const submitUserBtn = document.getElementById('submitUser')
        const usersResultDiv = document.getElementById('usersResult')

        createUserToggleBtn.onclick = () => {
            createUserFormDiv.style.display = createUserFormDiv.style.display === 'none' ? 'block' : 'none'
        }

        loadUsersBtn.onclick = async () => {
            usersResultDiv.innerHTML = `<div class="result loading">Cargando...</div>`
            try {
                const users = await api(`${API}/users/`)
                if (users?.length) {
                    usersResultDiv.innerHTML = users.map(u => `
                <div class="data-item">
                    <strong>${u.name}</strong><br>
                    Email: ${u.email}<br>
                    Estado: ${u.isActive ? '🟢 Activo' : '🔴 Inactivo'}<br>
                    ID: ${u.id}
                </div>
            `).join('')
                } else {
                    usersResultDiv.innerHTML = `<div class="result error">No hay usuarios</div>`
                }
            } catch (e) {
                usersResultDiv.innerHTML = `<div class="result error">❌ ${e.message}</div>`
            }
        }

        submitUserBtn.onclick = async () => {
            const name = document.getElementById('userName').value.trim()
            const email = document.getElementById('userEmail').value.trim()

            if (!name || !email) {
                usersResultDiv.innerHTML = `<div class="result error">❌ Nombre y email requeridos</div>`
                return
            }

            usersResultDiv.innerHTML = `<div class="result loading">Guardando usuario...</div>`

            try {
                await api(`${API}/users`, {
                    method: 'POST',
                    body: JSON.stringify({ name, email })
                })
                usersResultDiv.innerHTML = `<div class="result success">✅ Usuario creado</div>`
                createUserFormDiv.style.display = 'none'
                document.getElementById('userName').value = ''
                document.getElementById('userEmail').value = ''
                loadUsersBtn.click()  // Recarga la lista
            } catch (e) {
                usersResultDiv.innerHTML = `<div class="result error">❌ ${e.message}</div>`
            }
        }



        // Disponibilidad
        els.checkAvailability.onclick = async () => {
            const resourceId = els.resourceSelect.value
            const date = els.dateInput.value
            const result = document.getElementById('availabilityResult')

            if (!resourceId || !date) {
                return error(result, 'Selecciona recurso y fecha')
            }

            loading(result, 'Consultando disponibilidad...')

            try {
                const response = await api(`${API}/availability/${resourceId}/${date}`)

                if (!response.success) {
                    return error(result, response.message || 'Error desconocido')
                }

                const data = response.data

                if (!data) {
                    return error(result, 'No se recibieron datos')
                }

                let html = ''

                if (data.availableSlots?.length > 0) {
                    html += '<strong>Disponibles:</strong><div class="slots">'
                    html += data.availableSlots.map(s =>
                        `<div class="slot available" 
             data-start="${s.startTime}" 
             data-end="${s.endTime}" 
             onclick="selectSlot(this)">
             ${s.startTime} - ${s.endTime}
         </div>`).join('')
                    html += '</div>'
                } else {
                    html += '<div class="no-slots">No hay espacios disponibles.</div>'
                }

                if (data.unavailableSlots?.length > 0) {
                    html += '<strong>Ocupados:</strong><div class="slots">'
                    html += data.unavailableSlots.map(s => `<div class="slot unavailable">${s.startTime} - ${s.endTime}</div>`).join('')
                    html += '</div>'
                }

                result.innerHTML = html || 'No hay datos para mostrar'
            } catch (e) {
                error(result, `Error: ${e.message}`)
            }
        }

        function selectSlot(element) {
            const startTime = element.getAttribute('data-start')
            const endTime = element.getAttribute('data-end')

            // El recurso seleccionado en el select de reservas (para mayor seguridad, sincronízalo con el de disponibilidad)
            const resourceSelect = document.getElementById('reserveResourceSelect')
            const availabilityResourceSelect = document.getElementById('resourceSelect')

            // Sincronizar selects: si hay recurso seleccionado en disponibilidad, asignarlo en reservas también
            if (availabilityResourceSelect.value && availabilityResourceSelect.value !== resourceSelect.value) {
                resourceSelect.value = availabilityResourceSelect.value
            }

            // Formatear fechas para inputs datetime-local (se espera formato 'YYYY-MM-DDTHH:mm')
            // Supongo que startTime/endTime vienen en formato 'HH:mm' o similar; para ser seguros vamos a usar la fecha seleccionada
            const date = document.getElementById('dateInput').value // "YYYY-MM-DD"
            if (!date) return alert('Selecciona una fecha primero')

            // Construir strings para datetime-local
            // Asumamos que startTime/endTime vienen como "HH:mm"
            const startDateTime = `${date}T${startTime}`
            const endDateTime = `${date}T${endTime}`

            document.getElementById('startTimeInput').value = startDateTime
            document.getElementById('endTimeInput').value = endDateTime

            // Optional: poner el foco en el campo Usuario o en el botón Crear
            document.getElementById('userIdInput').focus()
        }

        // Reservas
        els.createReservation.onclick = async () => {
            const result = document.getElementById('reservationResult')
            const data = {
                resourceId: els.reserveResourceSelect.value,
                userId: els.userIdInput.value,
                startDate: els.startTimeInput.value,
                endDate: els.endTimeInput.value
            }

            if (!data.resourceId || !data.userId || !data.startDate || !data.endDate) {
                return error(result, 'Completa todos los campos')
            }

            loading(result)
            try {
                const res = await api(`${API}/reservations`, { method: 'POST', body: JSON.stringify(data) })
                success(result, 'Reserva creada: ' + JSON.stringify(res))
            } catch (e) {
                error(result, e.message)
            }
        }

        els.getReservation.onclick = async () => {
            const id = els.reservationIdInput.value
            const result = document.getElementById('reservationResult')
            if (!id) return error(result, 'ID requerido')

            loading(result)
            try {
                const res = await api(`${API}/reservations/${id}`)
                result.innerHTML = `<div class="data-item"><pre>${JSON.stringify(res, null, 2)}</pre></div>`
            } catch (e) {
                error(result, e.message)
            }
        }

        els.cancelReservation.onclick = async () => {
            const id = els.reservationIdInput.value
            const result = document.getElementById('reservationResult')
            if (!id) return error(result, 'ID requerido')

            loading(result)
            try {
                await api(`${API}/reservations/${id}`, { method: 'DELETE' })
                success(result, 'Reserva cancelada')
            } catch (e) {
                error(result, e.message)
            }
        }

        els.loadCalendar.onclick = async () => {
            const result = document.getElementById('calendarResult')
            loading(result)

            const startDate = document.getElementById('calendarStartDate').value
            const endDate = document.getElementById('calendarEndDate').value
            const resourceId = document.getElementById('calendarResourceId').value

            if (!startDate || !endDate) {
                error(result, 'Debes completar las fechas')
                return
            }

            const url = new URL(`${API}/calendar`)
            url.searchParams.append('startDate', startDate)
            url.searchParams.append('endDate', endDate)
            if (resourceId) url.searchParams.append('resourceId', resourceId)

            try {
                const data = await api(url.toString())
                console.log(data)
                const resources = data.data?.resources || []

                const html = resources
                    .filter(resource => resource.reservations.length > 0)
                    .map(resource => `
                                <div class="data-item">
                                    <strong>${resource.resourceName}</strong>
                                    ${resource.reservations.map(r => `
                                        <div class="reservation">
                                            Usuario: ${r.userName}<br>
                                            Inicio: ${new Date(r.startDate).toLocaleString()}<br>
                                            Final: ${new Date(r.endDate).toLocaleString()}<br>
                                            Estado: ${statusBadge(r.status)}<br>
                                            <hr>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')

                if (html) {
                    result.innerHTML = html
                } else {
                    error(result, 'No hay reservas')
                }

            } catch (e) {
                error(result, e.message)
            }
        }


        // Reportes
        els.loadOccupancyReport.onclick = async () => {
            const result = document.getElementById('reportResult')
            loading(result)
            try {
                const data = await api(`${API}/reports/occupancy`)
                result.innerHTML = `<div class="data-item"><pre>${JSON.stringify(data, null, 2)}</pre></div>`
            } catch (e) {
                error(result, e.message)
            }
        }

        // Transacciones
        els.loadFailedTransactions.onclick = async () => {
            const result = document.getElementById('transactionResult')
            loading(result)
            try {
                const data = await api(`${API}/transactions/failed`)
                if (data?.length) {
                    const html = data.map(t => `
        <div class="data-item">
          <strong>ID: ${t.correlationId}</strong><br>
          Error: ${t.error}<br>
          Fecha: ${new Date(t.timestamp).toLocaleString()}
        </div>
      `).join('')
                    result.innerHTML = html
                } else {
                    success(result, 'No hay transacciones fallidas')
                }
            } catch (e) {
                error(result, e.message)
            }
        }

        els.checkTransactionStatus.onclick = async () => {
            const id = els.correlationIdInput.value
            const result = document.getElementById('transactionResult')
            if (!id) return error(result, 'ID requerido')

            loading(result)
            try {
                const data = await api(`${API}/transactions/${id}/status`)
                result.innerHTML = `<div class="data-item">ID: ${data.correlationId}<br>Estado: ${statusBadge(data.status)}</div>`
            } catch (e) {
                error(result, e.message)
            }
        }

        els.checkTransactionEvents.onclick = async () => {
            const id = els.correlationIdInput.value
            const result = document.getElementById('transactionResult')
            if (!id) return error(result, 'ID requerido')

            loading(result)
            try {
                const data = await api(`${API}/transactions/${id}/events`)
                const html = data.map(e => `
      <div class="data-item">
        <strong>${e.type}</strong><br>
        ${new Date(e.timestamp).toLocaleString()}<br>
        <pre>${JSON.stringify(e.payload, null, 2)}</pre>
      </div>
    `).join('')
                result.innerHTML = html
            } catch (e) {
                error(result, e.message)
            }
        }

        els.retryTransaction.onclick = async () => {
            const id = els.correlationIdInput.value
            const result = document.getElementById('transactionResult')
            if (!id) return error(result, 'ID requerido')

            loading(result)
            try {
                await api(`${API}/transactions/${id}/retry`, { method: 'POST' })
                success(result, 'Transacción reenviada')
            } catch (e) {
                error(result, e.message)
            }
        } 
