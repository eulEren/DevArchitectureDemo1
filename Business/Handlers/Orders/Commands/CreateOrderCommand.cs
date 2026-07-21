using Business.BusinessAspects;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Business.Handlers.Orders.ValidationRules;

namespace Business.Handlers.Orders.Commands
{

    public class CreateOrderCommand : IRequest<IResult>
    {

        public int CreatedUserId { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int LastUpdatedUserId { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }
        public bool Status { get; set; }
        public bool IsDeleted { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }


        public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, IResult>
        {
            private readonly IOrderRepository _orderRepository;
            private readonly IMediator _mediator;
            private readonly IStockRepository _stockRepository;
            public CreateOrderCommandHandler(IOrderRepository orderRepository, IMediator mediator, IStockRepository stockRepository)
            {
                _orderRepository = orderRepository;
                _mediator = mediator;
                _stockRepository = stockRepository;
            }

            [ValidationAspect(typeof(CreateOrderValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
            {
                //var isThereOrderRecord = _orderRepository.Query().Any(u => u.CreatedUserId == request.CreatedUserId);

                //if (isThereOrderRecord == true)
                //    return new ErrorResult(Messages.NameAlreadyExist); aynı siparişten bir tane daha var mı  varsa error döndürür saçma 2 tane almak isteyebilirim
                var stock = _stockRepository.Query().SingleOrDefault(s => s.ProductId == request.ProductId && !s.IsDeleted);

                if (stock == null)
                {
                    return new ErrorResult(Messages.OutOfStock);
                }

                if (!stock.IsReadyForSale)
                {
                    return new ErrorResult(Messages.NotReadyForSale);
                }

                if (stock.Quantity < request.Quantity)
                {
                    return new ErrorResult(Messages.OutOfStock);
                }

                stock.Quantity -= request.Quantity;
                _stockRepository.Update(stock);

                var addedOrder = new Order
                {
                    CreatedUserId = request.CreatedUserId,
                    CreatedDate = request.CreatedDate,
                    LastUpdatedUserId = request.LastUpdatedUserId,
                    LastUpdatedDate = request.LastUpdatedDate,
                    Status = request.Status,
                    IsDeleted = request.IsDeleted,
                    CustomerId = request.CustomerId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,

                };

                _orderRepository.Add(addedOrder);
                await _orderRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);
            }
        }
    }
}