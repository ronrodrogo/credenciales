using Application.Collaborators.Queries.DTOs;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;


namespace Application.Collaborators.Queries;

public class GetCollaboratorByIdQuery : IRequest<Response<CollaboratorDEDto>>
{
    public int Id { get; set; }
}

public class GetCollaboratorByIdQueryHandler
    (
        IRepository<Collaborator> _repository,
        IMapper _mapper
    ) 
    : IRequestHandler<GetCollaboratorByIdQuery, Response<CollaboratorDEDto>>
{

    public async Task<Response<CollaboratorDEDto>> Handle(GetCollaboratorByIdQuery request, CancellationToken cancellationToken)
    {
        Response<CollaboratorDEDto> result = new();

        try
        {
            var data = _repository.GetAllActive()
                        .Include(x => x.Leadership)
                        .Include(x => x.Segment)
                        .AsNoTracking()
                        .ProjectTo<CollaboratorDEDto>(_mapper.ConfigurationProvider)
                        .Where(x => x.Id == request.Id)
                        .FirstOrDefault();

            result.Result = data;
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }

        return result;
    }

}
