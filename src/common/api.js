const gjdtxsphotomanagementApi = {
    list: () => {
      return https({
        url: '/gjdtxsphotomanagement/index',
        method: 'GET'
      })
    }
  }
  
  const gjdtxsrecognitionmodelmanagementApi = {
    list: () => {
      return https({
        url: '/gjdtxsrecognitionmodelmanagement/index',
        method: 'GET'
      })
    }
  }
  
  const gjdtxstaskmanagementApi = {
    list: () => {
      return https({
        url: '/gjdtxstaskmanagement/index',
        method: 'GET'
      })
    }
  }
  
  export default {
    gjdtxsphotomanagementApi,
    gjdtxsrecognitionmodelmanagementApi,
    gjdtxstaskmanagementApi
  }
  