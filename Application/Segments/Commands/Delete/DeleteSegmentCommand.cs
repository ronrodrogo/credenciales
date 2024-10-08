using Application.Attachments.Commands;
using Application.Collaborators.Queries;
using Application.Common.Interfaces;
using Application.Notifications;
using DevExtreme.AspNet.Data.ResponseModel;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Segments.Commands.Delete;

public record DeleteSegmentCommand : IRequest<Response<int>>
{
    public int Id { get; set; }
}

public class DeleteLeadershipCommandHandler
    (
        IRepository<Segment> _repository
    )
    : IRequestHandler<DeleteSegmentCommand, Response<int>>
{
    public async Task<Response<int>> Handle(DeleteSegmentCommand request, CancellationToken cancellationToken)
    {
        Response<int> result = new();
        try
        {
            var data = _repository.GetAll().First(x => x.Id == request.Id);

            data.Active = false;

            _repository.Update(data);
            _repository.Save();

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

}

