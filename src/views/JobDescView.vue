<template>
  <div class="wrapper">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
  <div class="container-wrapper">
    <div class="grid grid-cols-12 gap-12">
      <!-- Left Column - Made narrower -->
      <div class="col-span-6">
        <!-- Job Header -->
        <div class="job-header-wrapper">
          <div class="wrapper">
            <h2>{{ jobTitle }}</h2>
            <div class="apply-btn">Apply Now</div>
          </div>
          <p class="company">{{ company }}</p>
          <p class="location"><MapPin />{{ location }}</p>
          <!-- <p class="email"><img src="@\img\joblist-mail.svg" />{{ email }}</p> -->
        </div>

        <!-- Role Details -->
        <div class="content-role mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">About the Role</h3>
          <div class="description text-gray-600">{{ jobDescription }}</div>
        </div>

        <div class="content-responsibilities mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li v-for="(responsibility, index) in responsibilities" :key="index">
              {{ responsibility }}
            </li>
          </ul>
        </div>

        <div class="content-req mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li v-for="(requirement, index) in requirements" :key="index">
              {{ requirement }}
            </li>
          </ul>
        </div>

        <div class="content-preferred mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Preferred Qualifications</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li v-for="(qualification, index) in preferredQualifications" :key="index">
              {{ qualification }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column - Made wider -->
      <div class="col-span-6">
        <div class="cv-match-section bg-white rounded-2xl shadow-2xl p-10 sticky top-4">
          <div class="flex justify-between">
            <div class="space-y-6 w-full pr-10">
              <div>
                <h3 class="text-3xl font-semibold text-gray-800">Resume Match Score</h3>
                <p class="text-gray-600 mt-4">Based on the job requirements</p>
              </div>

              <!-- Matching Details -->
              <div class="mt-8 border-t border-gray-200 pt-6">
                <div class="border-b border-gray-200 pb-6 space-y-4">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    <span class="text-gray-600">{{ skill_score }}% skills matching</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    <span class="text-gray-600">{{ experience_score }}% experience matching</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    <span class="text-gray-600">{{ education_score }}% education matching</span>
                  </div>
                </div>

                <!-- Experience Analysis Section -->
                <div class="mt-6">
                  <nav class="flex w-full border-b border-gray-200">
                    <button
                      @click="activeTab = 'experience'"
                      :class="[
                        'px-10 py-4 font-medium',
                        activeTab === 'experience'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500',
                      ]"
                    >
                      Experience Analysis
                    </button>
                    <button
                      @click="activeTab = 'improvements'"
                      :class="[
                        'px-10 py-4 font-medium',
                        activeTab === 'improvements'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500',
                      ]"
                    >
                      Improvements
                    </button>
                  </nav>

                  <!-- Tab Content -->
                  <div class="mt-8">
                    <!-- Experience Tab -->
                    <div v-if="activeTab === 'experience'" class="grid grid-cols-2 gap-5">
                      <!-- Experience Keywords -->
                      <div>
                        <h4 class="text-gray-900 font-medium mb-4">Experience Keywords</h4>
                        <div class="space-y-3">
                          <div
                            v-if="experience_match"
                            class="bg-green-50 rounded-lg p-3 flex justify-between items-center"
                          >
                            <span class="text-green-700">{{ experience_match }}</span>
                            <span class="text-green-700 text-sm">Match</span>
                          </div>
                        </div>
                      </div>

                      <!-- Missing Experience -->
                      <div>
                        <h4 class="text-gray-900 font-medium mb-4">Missing Experience</h4>
                        <div class="space-y-3">
                          <div
                            v-if="experience_gaps"
                            class="bg-red-50 rounded-lg p-3 flex justify-between items-center"
                          >
                            <span class="text-rose-700">{{ experience_gaps }}</span>
                            <span class="text-rose-700 text-sm">Required</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Improvements Tab -->
                    <div v-if="activeTab === 'improvements'" class="grid grid-cols-2 gap-5 mt-6">
                      <!-- Skills Match -->
                      <div>
                        <h4 class="text-gray-900 font-medium mb-4">Skills Match</h4>
                        <div class="space-y-3">
                          <div
                            v-for="(skill, index) in skills_match"
                            :key="index"
                            class="bg-green-50 rounded-lg p-3 flex justify-between items-center"
                          >
                            <span class="text-green-700">{{ skill }}</span>
                            <span class="text-green-700 text-sm">Match</span>
                          </div>
                        </div>
                      </div>

                      <!-- Skills Gaps -->
                      <div>
                        <h4 class="text-gray-900 font-medium mb-4">Skills Gaps</h4>
                        <div class="space-y-3">
                          <div
                            v-if="skills_gaps"
                            class="bg-red-50 rounded-lg p-3 flex justify-between items-center"
                          >
                            <span class="text-rose-700">{{ skills_gaps }}</span>
                            <span class="text-rose-700 text-sm">Required</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Score Circle -->
            <div class="relative shrink-0">
              <div
                class="w-32 h-32 rounded-full border-8 border-sky-100 flex items-center justify-center"
              >
                <span class="text-[28px] font-semibold text-blue-600">{{ overall_score }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MapPin } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { useUserStore } from '@/stores/useUserStore'
import { useRoute, useRouter } from 'vue-router' // Add this

import api from '@/api/index'
const userStore = useUserStore()
const route = useRoute() // Add this line
const router = useRouter() // Add this
const isLoading = ref(false)

if (!route.query.id) {
  router.push('/job-listing')
}

// onMounted(async () => {
//   const email = userStore.email || ''
//   const jobList = await api.jobDesc(route.query.id, email)

//   if (jobList[0]) {
//     const jobdesc = jobList[0]

//     jobTitle.value = jobdesc.name
//     company.value = jobdesc.employer.name
//     location.value = jobdesc.location || 'Malaysia'
//     jobDescription.value = jobdesc.description
//     responsibilities.value = jobdesc.responsibilities
//     requirements.value = jobdesc.skills
//     preferredQualifications.value = [jobdesc.qualifications]
//   }
// })

const jobTitle = ref('')
const company = ref('')
const location = ref('')
// const email = ref('sarah.anderson@email.com')

const jobDescription = ref()
// 'We are looking for a Junior Malware Analyst to join our cybersecurity team. You will play a crucial role in analyzing malicious software, investigating security incidents, and strengthening our organizations defenses against cyber threats. If you have a passion for cybersecurity, problem-solving, and hands-on malware analysis, we want to hear from you!',

const responsibilities = ref([
  // 'Analyze and reverse engineer malware, including PE files and scripts.',
  // 'Investigate security incidents involving phishing, malware, and APTs.',
  // 'Utilize tools such as IDA Pro, Ghidra, Wireshark, and YARA to analyze threats.',
  // 'Develop and implement detection rules using SIEM platforms like Splunk.',
  // 'Research emerging malware trends to improve threat intelligence.',
  // 'Collaborate with the security team to recommend mitigation strategies.',
  // 'Document findings and create detailed reports on malware behavior.',
])

const requirements = ref([
  // "Bachelor's degree in Computer Science, Cybersecurity, or related field.",
  // '1+ years of experience in malware analysis or digital forensics.',
  // 'Understanding of malware analysis techniques (static, dynamic, behavioral).',
  // 'Familiarity with programming languages (Python, C, Assembly preferred).',
  // 'Knowledge of Windows and Linux internals.',
  // 'Experience with network analysis and forensic tools.',
])

const preferredQualifications = ref([
  // 'Certifications such as GREM, OSCP, or CEH.',
  // 'Experience with sandboxing environments.',
  // 'Prior experience analyzing email-based threats.',
])

// const email = userStore.email || ''
const skill_score = ref(0)
const experience_score = ref(0)
const education_score = ref(0)
const overall_score = ref(0)
const education_match = ref('')
const education_gaps = ref('')
const experience_match = ref('')
const experience_gaps = ref('')
const skills_match = ref([])
const skills_gaps = ref('')
const activeTab = ref('experience')

onMounted(async () => {
  isLoading.value = true
  api.jobDesc(route.query.id, userStore.email || '').then((jobList) => {
    // console.log(jobList[0])

    isLoading.value = false
    if (jobList[0]) {
      const jobdesc = jobList[0]
      console.log(jobdesc)

      jobTitle.value = jobdesc.name
      company.value = jobdesc.employer.name
      location.value = jobdesc.location || 'Malaysia'
      jobDescription.value = jobdesc.description
      responsibilities.value = jobdesc.responsibilities
      requirements.value = jobdesc.skills
      preferredQualifications.value = [jobdesc.qualifications]

      skill_score.value = jobdesc.user_application.match_json.match_analysis.skills_match.score
      experience_score.value =
        jobdesc.user_application.match_json.match_analysis.experience_match.score
      education_score.value =
        jobdesc.user_application.match_json.match_analysis.education_match.score
      overall_score.value = jobdesc.user_application.match_json.match_analysis.overall_match_score

      education_match.value =
        jobdesc.user_application.match_json.match_analysis.education_match
          .matched_requirements[0] || ''
      education_gaps.value =
        jobdesc.user_application.match_json.match_analysis.education_match.gaps[0] || ''
      experience_match.value =
        jobdesc.user_application.match_json.match_analysis.experience_match
          .relevant_experience[0] || ''
      experience_gaps.value =
        jobdesc.user_application.match_json.match_analysis.experience_match.missing_experience[0] ||
        ''
      skills_match.value =
        jobdesc.user_application.match_json.match_analysis.skills_match.matched_skills || []
      skills_gaps.value =
        jobdesc.user_application.match_json.match_analysis.skills_match.missing_skills[0] || ''
    }
  })
})
</script>

<style lang="scss" scoped>
$primary-color: #333;
$secondary-color: #555;
$background: #f9f9f9;

.container-wrapper {
  max-width: 1400px; /* Increased from 1200px */
  margin: 2rem auto;
  padding: 1.5rem;
  border-color: red;
  //   background: red;
  //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  //   border-radius: 8px;

  .job-header-wrapper {
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: $primary-color;
    }

    .apply-btn {
      border-radius: 25px;
      padding: 0.5rem 3rem;
      background-color: #000;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
    .wrapper {
      display: flex;
      justify-content: space-between;
    }
    .company {
      color: $secondary-color;
      font-size: 1rem;
    }

    .location,
    .email {
      color: $secondary-color;
      font-size: 0.95rem;
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }

  .content-wrapper {
    .cv-match-section {
      background: #f5f5f5;
      border-radius: 12px;
      padding: 2rem;
      margin: 2rem 0;
      display: flex;
      gap: 10rem;
      align-items: flex-start;

      .score-circle {
        background: #e8f5f0;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        margin-left: 1rem;

        .score {
          font-size: 2.5rem;
          font-weight: 600;
          color: #333;
        }

        .match-text {
          font-size: 0.9rem;
          color: #555;
        }
      }

      .matching-details {
        flex: 1;

        h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .matching-criteria {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;

          .criteria-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1rem;
            color: #333;

            .icon-success {
              color: #4caf50;
            }

            .icon-error {
              color: #f44336;
            }
          }
        }
      }
    }
    h3 {
      margin-top: 1.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: $primary-color;
    }

    .description {
      color: $secondary-color;
      text-align: justify;
    }

    ul {
      list-style: disc;
      padding-left: 1.25rem;
      color: $secondary-color;
    }
  }
}
</style>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ... existing styles ... */

.cv-match-section {
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.1);
}

.test {
  border: 1px solid red;
}
</style>
