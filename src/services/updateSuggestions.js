let referenceSequence = 0

const UPDATE_SUGGESTION_EMAIL = 'updates@pcscompanion.de'

const createReferenceNumber = () => {
  referenceSequence += 1
  const year = new Date().getFullYear()
  return `PCS-UPDATE-${year}-${String(referenceSequence).padStart(4, '0')}`
}
const line = (label, value) => `${label}: ${value || 'Not provided'}`

const createEmailBody = (formData, referenceNumber) => [
  'Germany PCS Companion — Update Suggestion',
  '',
  line('Reference', referenceNumber),
  line('Name', formData.name),
  line('Email', formData.email),
  line('Organization or office', formData.organization),
  line('Official source URL', formData.sourceUrl),
  line('Page or section', formData.pageSection),
  line('Type of update', formData.updateType),
  '',
  'CURRENT INFORMATION',
  formData.currentInformation || 'Not provided',
  '',
  'PROPOSED REPLACEMENT INFORMATION',
  formData.proposedInformation,
  '',
  'ADDITIONAL NOTES',
  formData.additionalNotes || 'Not provided',
  '',
  'Accuracy confirmation: Confirmed',
].join('\n')

export async function submitUpdateSuggestion(formData) {
  const referenceNumber = createReferenceNumber()
  const subject = `[${referenceNumber}] Update suggestion: ${formData.pageSection}`
  const body = createEmailBody(formData, referenceNumber)
  const mailtoUrl = `mailto:${UPDATE_SUGGESTION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  window.location.href = mailtoUrl

  return {
    ok: true,
    referenceNumber,
    mailtoUrl,
  }
}
