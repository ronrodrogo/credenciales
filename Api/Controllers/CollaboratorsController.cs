using Application.Collaborators.Queries;
using Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/collaborators")]
    public class CollaboratorsController : ControllerBase
    {

        [HttpGet("paginated", Name = "GetAllCollaboratorsPaginated")]
        public async Task<IActionResult> GetAllCollaboratorsPaginated([FromQuery] DataSourceLoadOptions query)
        {
            var result = await Mediator.Send(new GetCollaboratorsPaginatedQueryDE { Params = query });
            return HandleResult(result.Result, result.ErrorProvider);
        }

    }
}